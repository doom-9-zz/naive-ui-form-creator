<script setup lang="ts">
import { ref } from 'vue';
import { FormValidate } from 'naive-ui/es/form/src/interface';
import { useStore } from 'vuex';

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
    title="选项"
    positive-text="确认"
    @positive-click="handleValidateClick"
    @negative-click="cancelCallback"
    negative-text="取消"
  >
    <n-form :model="formValue" ref="formRef" label-placement="left">
      <n-form-item label="是否自动添加import" path="user.import">
        <n-switch v-model:value="formValue.import" />
      </n-form-item>
      <n-form-item label="是否添加‘确认’,‘取消’ 按钮" path="user.confirmAndCancelBtn">
        <n-switch v-model:value="formValue.confirmAndCancelBtn" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
<style></style>
