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
    <n-form-item label="选择框的类型">
      <n-radio-group v-model:value="formValue.type">
        <n-space>
          <n-radio :key="0" value="date">date</n-radio>
          <n-radio :key="1" value="datetime">datetime</n-radio>
          <n-radio :key="2" value="daterange">daterange</n-radio>
          <n-radio :key="3" value="datetimerange">datetimerange</n-radio>
          <n-radio :key="4" value="month">month</n-radio>
          <n-radio :key="5" value="year">year</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="时间格式化字符串">
      <n-input v-model:value="formValue.format" type="text" placeholder="请输入时间格式化字符串" />
    </n-form-item>
    <n-form-item label="Date Picker 中支持的操作">
      <n-select
        v-model:value="formValue.actions"
        multiple
        :options="
          formValue.type === 'date' || formValue.type === 'year'
            ? [
                {
                  label: 'now',
                  value: 'now',
                },
                {
                  label: 'clear',
                  value: 'clear',
                },
              ]
            : formValue.type === 'datetime' || formValue.type === 'month'
            ? [
                {
                  label: 'now',
                  value: 'now',
                },
                {
                  label: 'confirm',
                  value: 'confirm',
                },
                {
                  label: 'clear',
                  value: 'clear',
                },
              ]
            : formValue.type === 'daterange' || formValue.type === 'datetimerange'
            ? [
                {
                  label: 'clear',
                  value: 'clear',
                },
                {
                  label: 'confirm',
                  value: 'confirm',
                },
              ]
            : []
        "
      />
    </n-form-item>
    <n-form-item label="是否可清空">
      <n-radio-group v-model:value="formValue.clearable">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="选择框的尺寸">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>

    <n-form-item label="start 选框的提示信息" v-if="formValue.type.includes('range')">
      <n-input v-model:value="formValue.startPlaceholder" type="text" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="end 选框的提示信息" v-if="formValue.type.includes('range')">
      <n-input v-model:value="formValue.endPlaceholder" type="text" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="start 选框与 end 选框之间的分隔符" v-if="formValue.type.includes('range')">
      <n-input v-model:value="formValue.separator" type="text" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="选择框的占位符" v-else>
      <n-input
        v-model:value="formValue.placeholder"
        type="text"
        placeholder="请输入选择框的占位符"
      />
    </n-form-item>
  </n-form>
</template>
<style></style>
