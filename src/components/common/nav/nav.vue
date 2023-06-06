<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const onClickLeft = () => history.back();

defineProps<{
  title: string;
}>();
</script>
