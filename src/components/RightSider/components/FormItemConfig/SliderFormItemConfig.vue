<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';
import { ruleOptions } from '../../../../const/const';
import { inject } from 'vue';
import { appProvideKey } from '../../../../const/const';

const formValue = useConfig({});
const appProvideConfig = inject(appProvideKey);
</script>

<template>
  <n-form>
    <n-form-item :label="$t('id', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.name" type="text" />
    </n-form-item>
    <n-form-item :label="$t('name', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.label" type="text" />
    </n-form-item>
    <n-form-item :label="$t('rules', appProvideConfig?.local.value)">
      <n-select v-model:value="formValue.rules" multiple :options="ruleOptions" />
    </n-form-item>
    <n-form-item :label="$t('range', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.range">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes', appProvideConfig?.local.value) }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no', appProvideConfig?.local.value) }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('reverse', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.reverse">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes', appProvideConfig?.local.value) }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no', appProvideConfig?.local.value) }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('vertical', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.vertical">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes', appProvideConfig?.local.value) }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no', appProvideConfig?.local.value) }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('tooltip', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.tooltip">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes', appProvideConfig?.local.value) }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no', appProvideConfig?.local.value) }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('max', appProvideConfig?.local.value)">
      <n-input-number v-model:value="formValue.max" />
    </n-form-item>
    <n-form-item :label="$t('min', appProvideConfig?.local.value)">
      <n-input-number v-model:value="formValue.min" />
    </n-form-item>
    <n-form-item :label="$t('step', appProvideConfig?.local.value)">
      <n-input-number v-model:value="formValue.step" />
    </n-form-item>
  </n-form>
</template>
<style></style>
