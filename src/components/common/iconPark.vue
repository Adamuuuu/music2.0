<template>
  <component :is="icon" :size="size" :fill="fill" />
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";
const prop = defineProps<{
  icon: any;
  size?: number | string;
  fill?: string | string[];
}>();

const { icon, size, fill } = toRefs(prop);
</script>

<style scoped lang="less"></style>
