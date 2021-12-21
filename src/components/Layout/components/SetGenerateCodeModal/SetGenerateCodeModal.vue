<script setup lang="ts">
import { ref, inject } from 'vue';
import { FormValidate } from 'naive-ui/es/form/src/interface';
import { useStore } from 'vuex';
import { appProvideKey } from '../../../../const/const';

const showModal = ref<boolean>(false);
const cancelCallback = () => {};
const handleShowModal = () => {
  showModal.value = true;
};
const formRef = ref<null | {
  validate: FormValidate;
}>(null);
const formValue = ref({
  import: false,
  confirmAndCancelBtn: false,
});
const appProvideConfig = inject(appProvideKey);

const store = useStore();
const handleValidateClick = () => {
  if (formRef.value) {
    formRef.value.validate(errors => {
      if (!errors) {
        store.commit('changeAutoAddImport', formValue.value.import);
        store.commit('changeConfirmAndCancelBtn', formValue.value.confirmAndCancelBtn);
      } else {
        console.log(errors);
      }
    });
  }
};

defineExpose({
  handleShowModal,
});
</script>
<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="$t('modalTitle', appProvideConfig?.local.value)"
    :positive-text="$t('confirm', appProvideConfig?.local.value)"
    @positive-click="handleValidateClick"
    @negative-click="cancelCallback"
    :negative-text="$t('cancel', appProvideConfig?.local.value)"
  >
    <n-form :model="formValue" ref="formRef" label-placement="left">
      <n-form-item :label="$t('import', appProvideConfig?.local.value)">
        <n-switch v-model:value="formValue.import" />
      </n-form-item>
      <n-form-item :label="$t('confirmAndCancelBtn', appProvideConfig?.local.value)">
        <n-switch v-model:value="formValue.confirmAndCancelBtn" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
<style></style>
