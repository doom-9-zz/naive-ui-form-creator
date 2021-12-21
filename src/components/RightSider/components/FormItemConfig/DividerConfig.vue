<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig';
import { inject } from 'vue';
import { appProvideKey } from '../../../../const/const';

const formValue = useConfig({});
const appProvideConfig = inject(appProvideKey);
</script>

<template>
  <n-form>
    <n-form-item :label="$t('name', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.name" type="text" />
    </n-form-item>
    <n-form-item :label="$t('dashed', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.dashed">
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
    <n-form-item :label="$t('titlePlacement', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.titlePlacement">
        <n-space>
          <n-radio :key="0" value="left">left</n-radio>
          <n-radio :key="2" value="center">center</n-radio>
          <n-radio :key="1" value="right">right</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>
<style></style>
