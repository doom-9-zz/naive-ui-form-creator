<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';
import { ruleOptions } from '../../../../const/const';

const formValue = useConfig({});
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
    <n-form-item :label="$t('format')">
      <n-input v-model:value="formValue.format" type="text" />
    </n-form-item>
    <n-form-item :label="$t('actions')">
      <n-select
        v-model:value="formValue.actions"
        multiple
        :options="[
          {
            label: 'now',
            value: 'now',
          },
          {
            label: 'confirm',
            value: 'confirm',
          },
        ]"
      />
    </n-form-item>
    <n-form-item :label="$t('clearable')">
      <n-radio-group v-model:value="formValue.clearable">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
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
    <n-form-item :label="$t('placeholder')">
      <n-input v-model:value="formValue.placeholder" type="text" />
    </n-form-item>
    <n-form-item :label="$t('use12Hours')">
      <n-radio-group v-model:value="formValue.use12Hours">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>
<style></style>
