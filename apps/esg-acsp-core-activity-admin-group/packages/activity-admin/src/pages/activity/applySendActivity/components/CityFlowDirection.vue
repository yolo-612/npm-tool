<script setup lang="ts">
import {
  ElButton, ElRow, ElCol, ElMessage,
} from 'element-plus';
import { getAreaData } from '@/apis/methods/common';
import cityTreeSelect from '@/components/common/cityTreeSelect/index.vue';
import type { useTemplateAction } from '../composables/useTemplateAction';
import { EQUITY_TYPE } from '../composables/map';
import type { ICityFlowDirection } from '@/apis/methods/activity/applySendActivity/types';

const props = defineProps({
  type: {
    type: String,
    default: 'add',
  },
  state: {
    type: Object as PropType<ReturnType<typeof useTemplateAction>>,
    required: true,
  },
  disabledEquity: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function,
    default: () => {},
  },
});

/* 城市流向 */
const cityFlowDirectionList = ref<ICityFlowDirection[]>([]);

watch(
  () => props.state.formData.cityFlowDirectionListFullMinus,
  () => {
    cityFlowDirectionList.value = props.state.formData.cityFlowDirectionListFullMinus;
  },
  {
    immediate: true,
    deep: true,
  },
);

/** 是否可添加城市流向 */
const addDisabled = computed(() => props.disabledEquity || cityFlowDirectionList.value.length >= 5);

/** 是否可编辑城市流向 */
const editDisabled = computed(() => props.disabledEquity);

/* 是否支持多选 */
const isMultiple = computed(() => props.state.formData.equityType === EQUITY_TYPE.TIME_DISCOUNT);

/* 添加城市流向 */
const addCityFlowDirection = () => {
  if (!props.state.formData.equityType) {
    ElMessage.warning('请先选择券类型');
    return;
  }
  cityFlowDirectionList.value.push({
    sourceDistCode: [],
    targetDistCode: [],
  });
};

/* 移除城市流向 */
const removeCityFlowDirection = (index: number) => {
  cityFlowDirectionList.value.splice(index, 1);
};

/** 处理城市流向更新 */
const onChange = (value: string[], index: number, type: 'sourceDistCode' | 'targetDistCode') => {
  cityFlowDirectionList.value[index][type] = value;
  props.onChange(cityFlowDirectionList.value);
};

  interface IAreaTreeData {
    label: string;
    value: string;
    key: string;
    parentId: string | null;
    children: IAreaTreeData[];
    disabled?: boolean;
  }

/* 城市数据 */
const cityData = ref();
/* 树形数据 */
const areaTreeData = ref<IAreaTreeData[]>([]);
/** 中国大陆编码 */
const COUNTRY_CODE = 'A000086000';

/** tree-select 树形数据格式化 */
const formatTreeData = (data: any[], parentId: string | null = null): any[] => {
  return data.map((item) => {
    if (!item) return {};
    const { childList, distCnName, distCode } = item;
    const res = {
      label: distCnName,
      value: distCode,
      key: distCode,
      parentId: parentId,
      /** 单选时，只允许选中子节点 */
      disabled: !isMultiple.value && childList?.length >= 1,
      children: childList && formatTreeData(childList, distCode),
    };
    return res;
  });
};

/** 根据券类型动态更新 areaTreeData */
const updateAreaDataByCouponType = () => {
  const formattedTreeData = formatTreeData([cityData.value]);
  if (isMultiple.value) {
    // 多选模式，直接返回格式化后的城市数据
    areaTreeData.value = formattedTreeData;
    return;
  }
  // 单选模式下，创建一个特定的额外数据对象，表示"中国大陆不限城市"的相关信息
  const additionalData: IAreaTreeData = {
    label: '中国大陆不限城市',
    key: COUNTRY_CODE,
    value: COUNTRY_CODE,
    children: [],
    parentId: null,
    disabled: false,
  };
  areaTreeData.value = [formattedTreeData[0], additionalData];
};

/** 获取全国城市{ distCode: '城市编码', distCnName: '城市名称' } */
const initAreaData = async (): Promise<any> => {
  if (cityData.value) return cityData.value;
  try {
    const { success, obj } = await getAreaData();
    if (success && obj) {
      cityData.value = obj;
      updateAreaDataByCouponType();
    }
  } catch (error) {
    console.log('获取全国城市失败', error);
  }
  return cityData.value;
};

initAreaData();

watch(
  () => isMultiple.value,
  () => {
    updateAreaDataByCouponType();
  },
);

/** 出发城市 & 到达城市 */
const getAreaTreeData = (distCode: string[]) => {
  if (!isMultiple.value && distCode.includes(COUNTRY_CODE)) {
    // 单选模式下，同一条流向，只能有一端选择：全国不限城市，不能两端不限
    return [
      areaTreeData.value[0],
      {
        ...areaTreeData.value[1],
        disabled: true,
      },
    ];
  }
  return areaTreeData.value;
};
</script>
<template>
  <el-row :gutter="6" class="add-btn">
    <el-button type="primary" :disabled="addDisabled" @click="addCityFlowDirection"> + 添加城市流向 </el-button>
    <span class="add-tips">最多添加5个城市流向，不添加表示不限流向</span>
  </el-row>
  <el-row v-for="(flow, index) in cityFlowDirectionList" :key="index" class="flow-direction-list" :gutter="24">
    <el-col :span="3">
      <label><span class="prefix">* </span>城市流向{{ index + 1 }}</label>
    </el-col>
    <el-col :span="6">
      <cityTreeSelect
        :is-multiple="isMultiple"
        :disabled="editDisabled"
        :data="getAreaTreeData(cityFlowDirectionList[index].targetDistCode)"
        :value="isMultiple ? flow.sourceDistCode : flow.sourceDistCode[0]"
        @change="onChange($event, index, 'sourceDistCode')"
      />
    </el-col>
    <el-col :span="1">～</el-col>
    <el-col :span="6">
      <cityTreeSelect
        :is-multiple="isMultiple"
        :disabled="editDisabled"
        :data="getAreaTreeData(cityFlowDirectionList[index].sourceDistCode)"
        :value="isMultiple ? flow.targetDistCode : flow.targetDistCode[0]"
        @change="onChange($event, index, 'targetDistCode')"
      />
    </el-col>
    <el-col :span="3">
      <el-button type="danger" :disabled="editDisabled" @click="removeCityFlowDirection(index)">删除</el-button>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
  .add-btn {
    margin-left: 20px;
    .add-tips {
      margin-left: 10px;
      color: #999;
    }
  }
  .flow-direction-list {
    margin-top: 20px;
    .prefix {
      color: #f23030;
    }
  }
</style>
