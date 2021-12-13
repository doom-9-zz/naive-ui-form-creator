<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig({});
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
    <n-form-item label="最大输入长度">
      <n-input-number v-model:value="formValue.maxlength" placeholder="请输入最大输入长度" />
    </n-form-item>
    <n-form-item label="最小输入长度">
      <n-input-number v-model:value="formValue.minlength" placeholder="请输入最大输入长度" />
    </n-form-item>
    <n-form-item label="输入框类型">
      <n-radio-group v-model:value="formValue.type">
        <n-space>
          <n-radio :key="0" value="text">text</n-radio>
          <n-radio :key="1" value="password">password</n-radio>
          <n-radio :key="2" value="textarea">textarea</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="输入框尺寸">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>
<style></style>
