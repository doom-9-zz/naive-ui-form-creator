<script setup lang="ts">
import { useConfig } from '../../../../utils/hook/useConfig'
import { ruleOptions } from '../../../../const/const'

const formValue = useConfig({})
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
    <n-form-item :label="$t('type')">
      <n-radio-group v-model:value="formValue.type">
        <n-space>
          <n-radio :key="0" value="date">
            date
          </n-radio>
          <n-radio :key="1" value="datetime">
            datetime
          </n-radio>
          <n-radio :key="2" value="daterange">
            daterange
          </n-radio>
          <n-radio :key="3" value="datetimerange">
            datetimerange
          </n-radio>
          <n-radio :key="4" value="month">
            month
          </n-radio>
          <n-radio :key="5" value="year">
            year
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('format')">
      <n-input v-model:value="formValue.format" type="text" />
    </n-form-item>
    <n-form-item :label="$t('actions')">
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
    <n-form-item :label="$t('clearable')">
      <n-radio-group v-model:value="formValue.clearable">
        <n-space>
          <n-radio :key="0" :value="true">
            {{ $t('yes') }}
          </n-radio>
          <n-radio :key="1" :value="false">
            {{ $t('no') }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('size')">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">
            small
          </n-radio>
          <n-radio :key="1" value="medium">
            medium
          </n-radio>
          <n-radio :key="2" value="large">
            large
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>

    <n-form-item v-if="formValue.type.includes('range')" :label="$t('startPlaceholder')">
      <n-input v-model:value="formValue.startPlaceholder" type="text" />
    </n-form-item>
    <n-form-item v-if="formValue.type.includes('range')" :label="$t('endPlaceholder')">
      <n-input v-model:value="formValue.endPlaceholder" type="text" />
    </n-form-item>
    <n-form-item v-if="formValue.type.includes('range')" :label="$t('separator')">
      <n-input v-model:value="formValue.separator" type="text" />
    </n-form-item>
    <n-form-item v-else :label="$t('placeholder')">
      <n-input v-model:value="formValue.placeholder" type="text" />
    </n-form-item>
  </n-form>
</template>

<style></style>
