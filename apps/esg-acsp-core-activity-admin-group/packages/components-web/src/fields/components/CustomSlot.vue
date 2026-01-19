<script lang="ts" setup>
import type { ICustomComponent } from '../types';

const props = defineProps<ICustomSlots>();

defineOptions({
  name: 'CustomSlot',
});

interface ICustomSlots {
  content: string | ICustomComponent;
}
const attrs = useAttrs() as unknown as Record<string, any>;
</script>

<template>
  <span v-if="typeof props.content === 'string'">{{ props.content }}</span>
  <component :is="props.content.component" v-else v-bind="{ ...props.content.props, ...attrs }" />
</template>
