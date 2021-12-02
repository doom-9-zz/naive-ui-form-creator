<script setup lang="ts">
import LeftSider from '../LeftSider/Sider.vue';
import RightSider from '../RightSider/Sider.vue';
import Content from '../Content/Content.vue';

defineProps<{ isDark: boolean }>();
defineEmits(['changeTheme']);
const handleOpenGithub = () => {
  window.open('https://github.com/doom-9/naive-create-form', '_blank');
};
</script>

<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header
        style="
          height: 64px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
        bordered
      >
        <n-gradient-text type="success" :size="35">naive-ui-form-creator</n-gradient-text>
        <n-space>
          <n-button strong quaternary round @click="$emit('changeTheme')">
            {{ $props.isDark ? '白天' : '黑夜' }}
          </n-button>
          <n-button strong quaternary round @click="handleOpenGithub">Github</n-button>
        </n-space>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider bordered content-style="padding: 24px;" width="200">
          <LeftSider />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <Content />
        </n-layout>
        <n-layout-sider
          bordered
          content-style="padding: 24px;border-left: 1px solid var(--border-color)"
          width="400"
        >
          <RightSider />
        </n-layout-sider>
      </n-layout>
      <n-layout-footer bordered position="absolute" style="height: 64px; padding: 24px">
        持续完善中
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<style scoped></style>
