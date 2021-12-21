<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';
import { ruleOptions } from '../../../../const/const';

const formValue = useConfig<{
  label: string | undefined;
  name: string | undefined;
  size: 'small' | 'medium' | 'large';
  options: Array<{
    label: string;
    value: string;
  }>;
  rules: Array<string>;
}>({
  sync: false,
});
const onCreate = () => {
  return {
    label: '',
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
    <n-form-item :label="$t('size')">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('addOptions')">
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
    <n-button @click="handleSubmit" type="primary">
      {{ $t('apply') }}
    </n-button>
  </n-form>
</template>
<style></style>
