<script lang="ts" setup>
import { ElSteps, ElStep } from 'element-plus';
import { recompute } from '@/utils';
import CustomSlot from '@/src/fields/components/CustomSlot.vue';
import type { ICustomComponent } from '@/src/fields';

type TElStepProps = InstanceType<typeof ElStep>['$props'];

interface IStepProps {
  options: (TElStepProps & { slots: { [key: string]: ICustomComponent } })[];
}

const props = defineProps<IStepProps>();

const opts = computed(() => recompute(props.options));
const attrs = useAttrs();
</script>

<template>
  <ElSteps v-bind="attrs">
    <ElStep v-for="opt in opts" :key="opt.title" v-bind="opt">
      <template v-for=" (slot,slotName) in opt.slots" #[slotName]>
        <CustomSlot :key="slotName" :content="slot" />
      </template>
    </ElStep>
  </ElSteps>
</template>
