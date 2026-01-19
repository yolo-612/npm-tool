<script lang="ts" setup>
import { ElSelect } from 'element-plus';
import type { MaybeRefOrGetter } from 'vue';
import type { ICustomComponent, ISelectOption } from '@/src/fields';
import CustomSlot from './CustomSlot.vue';
import { recompute } from '@/utils';

const props = defineProps<IFieldSelectProps>();

defineOptions({
  name: 'FieldSelect',
  inheritAttrs: false,
});

type TSelectSlotType = 'header' | 'footer' | 'tag' | 'prefix';
type TGroupItem = ISelectOption & { options: ISelectOption[] };

export interface IFieldSelectProps {
  slots?: {
    [key in TSelectSlotType]: string | ICustomComponent;
  };
  options?: MaybeRefOrGetter<ISelectOption[]>;
  groups?: MaybeRefOrGetter<TGroupItem[]>;
}
const opts = computed(() => recompute(props.options));
const grps = computed(() => recompute(props.groups));
</script>

<template>
  <ElSelect v-bind="$attrs">
    <!-- 渲染options -->
    <template v-if="opts?.length">
      <template v-for="item in (opts as ISelectOption[] )" :key="item.key || item.label">
        <ElSelect.Option v-if="!item.hidden" v-bind="item" />
      </template>
    </template>
    <!-- 渲染groups -->
    <template v-if="grps?.length">
      <template v-for="item in (grps as TGroupItem[])" :key="item.key || item.label">
        <ElSelect.OptionGroup v-if="!item.hidden" :label="item.label" :disabled="item.disabled">
          <template v-for="option in item.options" :key="option.key || option.label">
            <ElSelect.Option v-if="!option.hidden" v-bind="option" />
          </template>
        </ElSelect.OptionGroup>
      </template>
    </template>
    <!-- 渲染插槽 -->
    <template v-for="(slot, slotName) in props.slots || {}" #[slotName]>
      <CustomSlot :key="slotName" :content="slot" />
    </template>
  </ElSelect>
</template>
