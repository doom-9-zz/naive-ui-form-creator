<script setup lang="ts">
import { useStore } from 'vuex';
import LeftSider from '../LeftSider/Sider.vue';
import RightSider from '../RightSider/Sider.vue';
import Content from '../Content/Content.vue';
import SetGenerateCodeModal from './components/SetGenerateCodeModal/SetGenerateCodeModal.vue';
import { copy, generateCode } from '../../utils';
import { inject, ref } from 'vue';
import { SettingOutlined, FolderOutlined } from '@vicons/antd';
import { State } from '../../store';
import { appProvideKey } from '../../const/const';

defineProps<{ isDark: boolean; isEnglish: boolean }>();
defineEmits(['changeTheme', 'changeLocale']);
const store = useStore<State>();
const handleOpenGithub = () => {
  window.open('https://github.com/doom-9/naive-create-form', '_blank');
};
const handleGenerateCode = () => {
  modalCode.value = generateCode(store.state.formItemArray);
  showModal.value = true;
};
const showModal = ref<boolean>(false);
const submitCallback = () => {
  copy(modalCode.value);
  window.$message.success('复制成功');
};
const cancelCallback = () => {
  showModal.value = false;
};
const modalCode = ref<string>('');
const SetGenerateCodeModalRef = ref<null | {
  handleShowModal: () => void;
}>(null);
const handleGenerateCodeSet = () => {
  if (SetGenerateCodeModalRef.value) {
    SetGenerateCodeModalRef.value.handleShowModal();
  }
};
const appProvideConfig = inject(appProvideKey);
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
        <n-gradient-text type="success" :size="35">naive-ui-form-creator</n-gradient-text>
        <n-space>
          <n-button
            type="primary"
            strong
            secondary
            round
            size="medium"
            @click="handleGenerateCodeSet"
          >
            {{ $t('generateCodeSettings', appProvideConfig?.local.value) }}
            <n-icon size="20">
              <SettingOutlined />
            </n-icon>
          </n-button>
          <n-button type="primary" strong secondary round size="medium" @click="handleGenerateCode">
            {{ $t('generateComponentCode', appProvideConfig?.local.value) }}
            <n-icon size="20">
              <FolderOutlined />
            </n-icon>
          </n-button>
          <n-button strong quaternary round @click="$emit('changeTheme')">
            {{
              $props.isDark
                ? $t('light', appProvideConfig?.local.value)
                : $t('dark', appProvideConfig?.local.value)
            }}
          </n-button>
          <n-button strong quaternary round @click="$emit('changeLocale')">
            {{ $props.isEnglish ? '中文' : 'English' }}
          </n-button>
          <n-button strong quaternary round @click="handleOpenGithub">Github</n-button>
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
        {{ $t('tip', appProvideConfig?.local.value) }}
      </n-layout-footer>
    </n-layout>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      title="预览"
      positive-text="复制"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
      negative-text="重新弄一下"
    >
      <n-code :code="modalCode" language="javascript" />
    </n-modal>
    <SetGenerateCodeModal ref="SetGenerateCodeModalRef" />
  </div>
</template>

<style scoped></style>
