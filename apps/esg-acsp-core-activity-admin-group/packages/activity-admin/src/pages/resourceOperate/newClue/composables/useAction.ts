import type { Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { queryClueList, queryDict } from '@/apis/methods/activity/newClue';
import type {
  TClueEditAction, IClueEditData, IClueDetailData, IPageParams, IResList, IClueSearchForm,
} from './types';
import { formatAreaData, type IRangeItem, type IRangeData } from '@/components/common/areaSearchSelect/config';

export default function (searchTableRef: Ref<any>) {
  /* 搜索数据 */
  const formData: IClueSearchForm = reactive({
    range: [],
    monthList: [], // 线索月份
    stateList: [], // 卡号状态
    empCode: '', // 工号
    phone: '', // 加密手机号
  });

  /* 表格选择 */
  const selectList = ref<any[]>([]);
  /* 处理选择 */
  const elTableRef = computed(() => searchTableRef.value?.getPureTableRef());
  const handleSelectionChange = (val: any[]) => {
    if (val.length > 10) {
      ElMessage({
        message: '一次最多只能选择10条数据',
        type: 'warning',
        grouping: true,
      });
      const restRows = val.slice(10);
      restRows.forEach((row) => elTableRef.value.toggleRowSelection(row, false));
    }
    selectList.value = val || [];
  };

  /** 我的范围数据 */
  const empLargest = ref<IRangeItem[]>();
  /** 员工范围初始化数据准备好 */
  const onEmpRangeReady = ({ largest }: IRangeData) => {
    empLargest.value = largest;
    searchList();
  };

  /* 查询列表数据 */
  const searchAction = async (pageInfo: IPageParams, action: string): Promise<IResList<any>> => {
    if (action === 'reset') formData.range = [];
    if (action !== 'pageChange') elTableRef.value?.clearSelection();
    const { range, ...restParam } = formData;
    const { pageNum, pageSize } = pageInfo;
    const rangeObj = formatAreaData({
      largest: empLargest.value || [],
      current: range || [],
    });
    const params = {
      pageNum,
      pageSize,
      ...restParam,
      ...rangeObj,
    };
    try {
      const { obj } = await queryClueList(params);
      if (!obj || !obj.list) {
        return { totalSize: 0, list: [] };
      }
      return obj;
    } catch (error) {
      ElMessage.error('查询失败');
      return { totalSize: 0, list: [] };
    }
  };

  /**  手动拉取列表数据 */
  const searchList = () => {
    searchTableRef.value?.fetchData('search');
  };

  /* 修改小哥数据 */
  const editData = reactive<IClueEditData>({
    show: false,
    list: [],
    action: 'single',
  });
  /* 展示修改小哥弹窗 */
  const showEdit = (action: TClueEditAction, data?: object) => {
    if (action === 'batch' && !selectList.value.length) {
      ElMessage.warning({
        message: '请至少选择1条数据',
        type: 'warning',
        grouping: true,
      });
      return;
    }
    editData.action = action;
    editData.list = action === 'single' ? [data] : selectList.value;
    editData.show = true;
  };

  /* 展示详情的数据 */
  const historyData = reactive<IClueDetailData>({
    show: false,
    id: null,
  });
  /* 展示详情弹窗 */
  const showHistory = (id: number) => {
    historyData.show = true;
    historyData.id = id;
  };

  const clueStatusOpt = ref<any[]>([]);
  const clueStatusMap = ref<any>({});
  /* 获取字段数据 */
  const getDictData = async () => {
    try {
      const { obj } = await queryDict({
        typeCodeList: ['promotion_state_list'],
      });
      const { promotion_state_list } = obj || {};
      clueStatusOpt.value = (promotion_state_list || []).map(({ name: label, code: value }) => {
        clueStatusMap.value[value] = label;
        return { label, value };
      });
    } catch (error) {}
  };

  return {
    formData,
    historyData,
    selectList,
    editData,
    clueStatusOpt,
    clueStatusMap,
    getDictData,
    showEdit,
    searchAction,
    handleSelectionChange,
    onEmpRangeReady,
    searchList,
    showHistory,
  };
}
