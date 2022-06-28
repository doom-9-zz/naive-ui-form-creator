<script setup lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue'
import { FolderOutlined, SettingOutlined } from '@vicons/antd'
import LeftSider from '../LeftSider/Sider.vue'
import RightSider from '../RightSider/Sider.vue'
import Content from '../Content/Content.vue'
import { copy, generateCode } from '../../utils'
import type { State } from '../../store'
import SetGenerateCodeModal from './components/SetGenerateCodeModal/SetGenerateCodeModal.vue'

defineProps<{ isDark: boolean; isEnglish: boolean }>()
defineEmits(['changeTheme', 'changeLocale'])
const store = useStore<State>()
const modalCode = ref<string>('')
const showModal = ref<boolean>(false)
const handleOpenGithub = () => {
  window.open('https://github.com/doom-9/naive-create-form', '_blank')
}
const handleGenerateCode = () => {
  modalCode.value = generateCode(store.state.formItemArray)
  showModal.value = true
}
const submitCallback = () => {
  copy(modalCode.value)
  window.$message.success('Success')
}
const cancelCallback = () => {
  showModal.value = false
}
const SetGenerateCodeModalRef = ref<null | {
  handleShowModal: () => void
}>(null)
const handleGenerateCodeSet = () => {
  if (SetGenerateCodeModalRef.value)
    SetGenerateCodeModalRef.value.handleShowModal()
}
</script>

<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header
        style="
          height: 64px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
        bordered
      >
        <n-gradient-text type="success" :size="35">
          naive-ui-form-creator
        </n-gradient-text>
        <n-space>
          <n-button
            type="primary"
            strong
            secondary
            round
            size="medium"
            @click="handleGenerateCodeSet"
          >
            {{ $t('generateCodeSettings') }}
            <n-icon size="20">
              <SettingOutlined />
            </n-icon>
          </n-button>
          <n-button type="primary" strong secondary round size="medium" @click="handleGenerateCode">
            {{ $t('generateComponentCode') }}
            <n-icon size="20">
              <FolderOutlined />
            </n-icon>
          </n-button>
          <n-button strong quaternary round @click="$emit('changeTheme')">
            {{ $props.isDark ? $t('light') : $t('dark') }}
          </n-button>
          <n-button strong quaternary round @click="$emit('changeLocale')">
            {{ $props.isEnglish ? '中文' : 'English' }}
          </n-button>
          <n-button strong quaternary round @click="handleOpenGithub">
            Github
          </n-button>
        </n-space>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider bordered content-style="padding: 24px;" width="200">
          <LeftSider />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <Content />
        </n-layout>
        <n-layout-sider
          bordered
          content-style="padding: 24px;border-left: 1px solid var(--border-color)"
          width="400"
        >
          <RightSider />
        </n-layout-sider>
      </n-layout>
      <n-layout-footer bordered position="absolute" style="height: 64px; padding: 24px">
        {{ $t('tip') }}
      </n-layout-footer>
    </n-layout>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :title="$t('preview')"
      :positive-text="$t('copy')"
      :negative-text="$t('redo')"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    >
      <n-code :code="modalCode" language="javascript" />
    </n-modal>
    <SetGenerateCodeModal ref="SetGenerateCodeModalRef" />
  </div>
</template>

<style scoped></style>
