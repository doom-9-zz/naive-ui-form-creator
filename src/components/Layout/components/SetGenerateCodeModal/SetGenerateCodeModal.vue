<script setup lang="ts">
import { ref } from 'vue'
import type { FormValidate } from 'naive-ui/es/form/src/interface'
import { useStore } from 'vuex'

const showModal = ref<boolean>(false)
const cancelCallback = () => {}
const handleShowModal = () => {
  showModal.value = true
}
const formRef = ref<null | {
  validate: FormValidate
}>(null)
const formValue = ref({
  import: false,
  confirmAndCancelBtn: false,
})

const store = useStore()
const handleValidateClick = () => {
  if (formRef.value) {
    formRef.value.validate((errors) => {
      if (!errors) {
        store.commit('changeAutoAddImport', formValue.value.import)
        store.commit('changeConfirmAndCancelBtn', formValue.value.confirmAndCancelBtn)
      }
      else {
        // console.log(errors)
      }
    })
  }
}

defineExpose({
  handleShowModal,
})
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="$t('modalTitle')"
    :positive-text="$t('confirm')"
    :negative-text="$t('cancel')"
    @positive-click="handleValidateClick"
    @negative-click="cancelCallback"
  >
    <n-form ref="formRef" :model="formValue" label-placement="left">
      <n-form-item :label="$t('import')">
        <n-switch v-model:value="formValue.import" />
      </n-form-item>
      <n-form-item :label="$t('confirmAndCancelBtn')">
        <n-switch v-model:value="formValue.confirmAndCancelBtn" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style></style>
