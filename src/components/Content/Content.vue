<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const formItemTypeArray = computed(() => {
  return store.state.formItemTypeArray;
});
</script>
<template>
  <n-divider title-placement="left">预览</n-divider>
  <n-card>
    <n-empty description="从左侧添加表单项" v-if="formItemTypeArray.length === 0">
      <template #extra>
        <n-button size="small">试着添加一个</n-button>
      </template>
    </n-empty>
    <n-form label-placement="left" v-else>
      <n-form-item v-for="item in formItemTypeArray" :label="item.label">
        <n-input v-if="item.value === '0'" />
        <n-input-number v-else-if="item.value === '1'" />
        <n-radio v-else-if="item.value === '2'" value="radio" name="radio">radio</n-radio>
        <n-rate v-else-if="item.value === '3'" />
        <n-select
          v-else-if="item.value === '4'"
          :options="[
            {
              label: 'select',
              value: 'select',
            },
          ]"
        />
        <n-slider v-else-if="item.value === '5'" />
        <n-switch v-else-if="item.value === '6'" />
        <n-time-picker v-else-if="item.value === '7'" />
        <n-tree-select
          v-else-if="item.value === '8'"
          :options="[
            {
              label: 'tree',
              key: 'tree',
              children: [
                {
                  label: 'tree-select',
                  key: 'tree-select',
                },
              ],
            },
          ]"
        />
        <n-upload v-else-if="item.value === '9'">
          <n-button>上传文件</n-button>
        </n-upload>
        <n-color-picker v-else-if="item.value === '10'" />
        <n-checkbox v-else-if="item.value === '11'" />
      </n-form-item>
    </n-form>
  </n-card>
</template>

<style lang=""></style>
