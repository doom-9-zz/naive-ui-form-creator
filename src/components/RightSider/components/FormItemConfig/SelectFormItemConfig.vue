<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig<{
  label: string | undefined;
  name: string | undefined;
  size: 'small' | 'medium' | 'large';
  multiple: boolean;
  placeholder: string;
  clearable: boolean;
  options: Array<{
    label: string;
    value: string;
  }>;
}>({
  label: undefined,
  name: undefined,
  size: 'medium',
  multiple: false,
  placeholder: '请选择',
  clearable: false,
  options: [],
});

const onCreate = () => {
  return {
    label: '',
    value: '',
  };
};
</script>

<template>
  <n-form>
    <n-form-item label="字段标识">
      <n-input v-model:value="formValue.name" type="text" placeholder="请输入字段标识" />
    </n-form-item>
    <n-form-item label="字段名称">
      <n-input v-model:value="formValue.label" type="text" placeholder="请输入字段名称" />
    </n-form-item>
    <n-form-item label="是否可清空">
      <n-radio-group v-model:value="formValue.clearable">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="提示信息">
      <n-input v-model:value="formValue.placeholder" type="text" placeholder="请输入提示信息" />
    </n-form-item>
    <n-form-item label="组件尺寸">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否为多选">
      <n-radio-group v-model:value="formValue.multiple">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="添加选项">
      <n-dynamic-input
        item-style="margin-bottom: 0;"
        v-model:value="formValue.options"
        :on-create="onCreate"
        #default="{ index, value }"
      >
        <div style="display: flex">
          <n-form-item :show-label="false">
            <n-input
              placeholder="Label"
              @keydown.enter.prevent
              v-model:value="formValue.options[index].label"
            />
          </n-form-item>
          <div style="height: 34px; line-height: 34px; margin: 0 8px">-</div>
          <n-form-item :show-label="false">
            <n-input
              placeholder="Value"
              @keydown.enter.prevent
              v-model:value="formValue.options[index].value"
            />
          </n-form-item>
        </div>
      </n-dynamic-input>
    </n-form-item>
  </n-form>
</template>
<style></style>
