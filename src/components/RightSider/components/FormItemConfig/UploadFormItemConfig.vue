<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';
import { ruleOptions } from '../../../../const/const';

const formValue = useConfig<{
  label: string | undefined;
  name: string | undefined;
  accept: string | undefined;
  action: string | undefined;
  defaultUpload: boolean;
  data: Array<{
    key: string;
    value: string;
  }>;
  headers: Array<{
    key: string;
    value: string;
  }>;
  listType: 'text' | 'image' | 'image-card';
  max: number | undefined;
  method: string;
  multiple: boolean;
  fileName: string;
  withCredentials: boolean;
  showCancelButton: boolean;
  showDownloadButton: boolean;
  showRemoveButton: boolean;
  showRetryButton: boolean;
  showFileList: boolean;
  rules: Array<string>;
}>({
  sync: false,
});

const onCreate = () => {
  return {
    key: '',
    value: '',
  };
};
const store = useStore();
const handleSubmit = () => {
  store.commit('changeSelectedFormItemConfig', formValue.value);
};
</script>

<template>
  <n-form>
    <n-form-item :label="$t('id')">
      <n-input v-model:value="formValue.name" type="text" />
    </n-form-item>
    <n-form-item :label="$t('name')">
      <n-input v-model:value="formValue.label" type="text" />
    </n-form-item>
    <n-form-item :label="$t('rules')">
      <n-select v-model:value="formValue.rules" multiple :options="ruleOptions" />
    </n-form-item>
    <n-form-item :label="$t('accept')">
      <n-input v-model:value="formValue.accept" type="text" />
    </n-form-item>
    <n-form-item :label="$t('action')">
      <n-input v-model:value="formValue.action" type="text" />
    </n-form-item>
    <n-form-item :label="$t('uploadData')">
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
    <n-form-item :label="$t('headers')">
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
    <n-form-item :label="$t('defaultUpload')">
      <n-radio-group v-model:value="formValue.defaultUpload">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('listType')">
      <n-radio-group v-model:value="formValue.listType">
        <n-space>
          <n-radio :key="0" value="text">text</n-radio>
          <n-radio :key="1" value="image">image</n-radio>
          <n-radio :key="2" value="image-card">image-card</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('uploadMax')">
      <n-input-number v-model:value="formValue.max" />
    </n-form-item>
    <n-form-item :label="$t('method')">
      <n-input v-model:value="formValue.method" type="text" />
    </n-form-item>
    <n-form-item :label="$t('multiple')">
      <n-radio-group v-model:value="formValue.multiple">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('fileName')">
      <n-input v-model:value="formValue.fileName" type="text" />
    </n-form-item>
    <n-form-item :label="$t('withCredentials')">
      <n-radio-group v-model:value="formValue.withCredentials">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('showCancelButton')">
      <n-radio-group v-model:value="formValue.showCancelButton">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('showDownloadButton')">
      <n-radio-group v-model:value="formValue.showDownloadButton">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('showRemoveButton')">
      <n-radio-group v-model:value="formValue.showRemoveButton">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('showRetryButton')">
      <n-radio-group v-model:value="formValue.showRetryButton">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('showFileList')">
      <n-radio-group v-model:value="formValue.showFileList">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-button @click="handleSubmit" type="primary">
      {{ $t('apply') }}
    </n-button>
  </n-form>
</template>
<style></style>
