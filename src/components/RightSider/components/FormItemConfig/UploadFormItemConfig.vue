<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig<{
  label: string | undefined;
  name: string | undefined;
  accept: string | undefined;
  action: string | undefined;
  defaultUpload: 'true' | 'false';
  data: Array<{
    key: string;
    value: string;
  }>;
  headers: Array<{
    key: string;
    value: string;
  }>;
  listType: 'text' | 'image' | 'image-card';
  max: string | undefined;
  method: string;
  multiple: 'true' | 'false';
  fileName: string;
  withCredentials: 'true' | 'false';
}>({
  label: undefined,
  name: undefined,
  accept: undefined,
  action: undefined,
  defaultUpload: 'true',
  data: [],
  headers: [],
  listType: 'text',
  max: undefined,
  method: 'POST',
  multiple: 'false',
  fileName: 'file',
  withCredentials: 'false',
});
const store = useStore();
const handleApplyClick = () => {
  store.commit('changeSelectedFormItemConfig', formValue.value);
};

const onCreate = () => {
  return {
    key: '',
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
    <n-form-item label="接受的文件类型">
      <n-input v-model:value="formValue.accept" type="text" placeholder="请输入接受的文件类型" />
    </n-form-item>
    <n-form-item label="请求提交的地址">
      <n-input v-model:value="formValue.action" type="text" placeholder="请输入请求提交的地址" />
    </n-form-item>
    <n-form-item label="提交表单需要附加的数据">
      <n-dynamic-input
        item-style="margin-bottom: 0;"
        v-model:value="formValue.data"
        :on-create="onCreate"
        #default="{ index, value }"
      >
        <div style="display: flex">
          <n-form-item :show-label="false">
            <n-input
              placeholder="Key"
              @keydown.enter.prevent
              v-model:value="formValue.data[index].key"
            />
          </n-form-item>
          <div style="height: 34px; line-height: 34px; margin: 0 8px">-</div>
          <n-form-item :show-label="false">
            <n-input
              placeholder="Value"
              @keydown.enter.prevent
              v-model:value="formValue.data[index].value"
            />
          </n-form-item>
        </div>
      </n-dynamic-input>
    </n-form-item>
    <n-form-item label="HTTP 请求需要附加的 Headers">
      <n-dynamic-input
        item-style="margin-bottom: 0;"
        v-model:value="formValue.headers"
        :on-create="onCreate"
        #default="{ index, value }"
      >
        <div style="display: flex">
          <n-form-item :show-label="false">
            <n-input
              placeholder="Key"
              @keydown.enter.prevent
              v-model:value="formValue.headers[index].key"
            />
          </n-form-item>
          <div style="height: 34px; line-height: 34px; margin: 0 8px">-</div>
          <n-form-item :show-label="false">
            <n-input
              placeholder="Value"
              @keydown.enter.prevent
              v-model:value="formValue.headers[index].value"
            />
          </n-form-item>
        </div>
      </n-dynamic-input>
    </n-form-item>
    <n-form-item label="选择文件时候是否默认上传">
      <n-radio-group v-model:value="formValue.defaultUpload">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="文件列表的内建样式">
      <n-radio-group v-model:value="formValue.listType">
        <n-space>
          <n-radio :key="0" value="text">text</n-radio>
          <n-radio :key="1" value="image">image</n-radio>
          <n-radio :key="2" value="image-card">image-card</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="限制上传文件数量">
      <n-input v-model:value="formValue.max" type="text" placeholder="请输入限制上传文件数量" />
    </n-form-item>
    <n-form-item label="HTTP 请求的方法">
      <n-input v-model:value="formValue.method" type="text" placeholder="请输入请求的方法" />
    </n-form-item>
    <n-form-item label="是否支持多个文件">
      <n-radio-group v-model:value="formValue.multiple">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="文件在提交表单中的字段名">
      <n-input v-model:value="formValue.fileName" type="text" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="是否携带 Cookie">
      <n-radio-group v-model:value="formValue.withCredentials">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-space>
    <n-button type="primary" @click="handleApplyClick">应用</n-button>
  </n-space>
</template>
<style></style>
