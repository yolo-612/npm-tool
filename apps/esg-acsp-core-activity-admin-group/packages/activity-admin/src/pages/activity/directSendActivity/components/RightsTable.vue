<script setup lang="ts">
import { PureTable } from '@fpkg/components-web';
import type useAction from '../composables/useEditAction';
import useConfig from '../composables/useEditConfig';
import type { PAGE_ACTION } from '../types';

const props = defineProps<{ state: ReturnType<typeof useAction>; type: PAGE_ACTION }>();
const config = useConfig(props.state, props.type);
</script>
<template>
  <PureTable
    :columns="config.rightsTableColumns"
    :data="props.state.rightsData.value"
    autoHeight
    size="small"
  ></PureTable>
</template>
<style lang="sass" scoped></style>
