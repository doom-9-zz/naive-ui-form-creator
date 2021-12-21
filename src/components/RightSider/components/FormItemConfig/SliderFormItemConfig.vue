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
    <n-form-item :label="$t('range')">
      <n-radio-group v-model:value="formValue.range">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('reverse')">
      <n-radio-group v-model:value="formValue.reverse">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('vertical')">
      <n-radio-group v-model:value="formValue.vertical">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('tooltip')">
      <n-radio-group v-model:value="formValue.tooltip">
        <n-space>
          <n-radio :key="0" :value="true">{{ $t('yes') }}</n-radio>
          <n-radio :key="1" :value="false">{{ $t('no') }}</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('max')">
      <n-input-number v-model:value="formValue.max" />
    </n-form-item>
    <n-form-item :label="$t('min')">
      <n-input-number v-model:value="formValue.min" />
    </n-form-item>
    <n-form-item :label="$t('step')">
      <n-input-number v-model:value="formValue.step" />
    </n-form-item>
  </n-form>
</template>
<style></style>
