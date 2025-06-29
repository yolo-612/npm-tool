<script lang="ts" setup>
// @ts-nocheck
import type { ICustomComponent } from '@/components/config-comp/fields/types'

interface ICustomSlots {
  content: string | ICustomComponent;
}
const props = defineProps<ICustomSlots>();

const attrs = useAttrs();
</script>

<template>
  <span v-if="typeof props.content === 'string'">{{ props.content }}</span>
  <component :is="props.content.component" v-else v-bind="{ ...props.content.props, ...attrs }" />
</template>
