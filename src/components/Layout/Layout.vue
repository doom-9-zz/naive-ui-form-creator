<script setup lang="ts">
import LeftSider from '../LeftSider/Sider.vue';
import RightSider from '../RightSider/Sider.vue';
import Content from '../Content/Content.vue';

// defineProps<{ msg: string }>()
</script>

<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px; padding: 24px" bordered>颐和园路</n-layout-header>
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
        footer
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<style scoped></style>
