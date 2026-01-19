<script setup lang="ts">
import usePermission from '@/hook/usePermission';

const props = defineProps<{
    value:(string | RegExp)[];
    type: undefined | '' | 'check-all';
  }>();

const permission = usePermission();

function check() {
  return props.type === 'check-all'
    ? permission.checkPermissionAll(props.value)
    : permission.checkPermission(props.value);
}
</script>

<template>
  <div>
    <slot v-if="check()" />
    <slot v-else name="no-permission" />
  </div>
</template>
