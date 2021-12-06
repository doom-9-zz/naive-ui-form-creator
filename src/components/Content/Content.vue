<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { DeleteOutlined, CopyOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd';
import { State } from '../../store/index';

const store = useStore<State>();
const formItemArray = computed(() => {
  return store.state.formItemArray;
});
const formConfig = computed(() => {
  return store.state.formConfig;
});
const handleAddClick = () => {
  store.commit('add', {
    value: '0',
    label: '文本输入',
  });
};
const handleUpClick = (id: string) => {
  store.commit('up', id);
};
const handleDownClick = (id: string) => {
  store.commit('down', id);
};
const handleRemoveClick = (id: string) => {
  store.commit('remove', id);
};
const handleCopyClick = (id: string) => {
  store.commit('copy', id);
};
const setSelectedFormItem = (id: string) => {
  store.commit('changeSelectedFormItem', id);
};
const selectedFormItem = computed(() => {
  return store.state.selectedFormItem;
});
const songs = ref(
  [
    {
      value: "Rock'n'Roll Star",
      label: "Rock'n'Roll Star",
    },
    {
      value: 'Shakermaker',
      label: 'Shakermaker',
    },
    {
      value: 'Live Forever',
      label: 'Live Forever',
    },
    {
      value: 'Up in the Sky',
      label: 'Up in the Sky',
    },
    {
      value: '...',
      label: '...',
    },
  ].map(s => {
    s.value = s.value.toLowerCase();
    return s;
  }),
);
</script>
<template>
  <n-divider title-placement="left">预览</n-divider>
  <n-empty description="从左侧添加表单项" v-if="formItemArray.length === 0">
    <template #extra>
      <n-button @click="handleAddClick">试着添加一个</n-button>
    </template>
  </n-empty>
  <n-form
    :label-placement="formConfig.labelPlacement"
    :size="formConfig.size"
    :label-width="formConfig.labelWidth"
    :label-align="formConfig.labelAlign"
    :show-feedback="formConfig.showFeedback"
    :show-label="formConfig.showLabel"
    :show-require-mark="formConfig.showRequireMark"
    :require-mark-placement="formConfig.requireMarkPlacement"
    v-else
  >
    <n-space vertical :size="15">
      <n-card
        v-for="item in formItemArray"
        @click="setSelectedFormItem(item.id)"
        :contentStyle="`cursor: pointer; ${
          selectedFormItem === item.id ? 'border: 1px solid #18a058;' : ''
        }`"
      >
        <div class="buttons">
          <n-space>
            <n-button circle type="primary" size="small" @click.stop="handleCopyClick(item.id)">
              <n-icon size="20">
                <CopyOutlined />
              </n-icon>
            </n-button>
            <n-button circle type="error" size="small" @click.stop="handleRemoveClick(item.id)">
              <n-icon size="20">
                <DeleteOutlined />
              </n-icon>
            </n-button>
            <n-button circle type="info" size="small" @click.stop="handleDownClick(item.id)">
              <n-icon size="20">
                <ArrowDownOutlined />
              </n-icon>
            </n-button>
            <n-button circle type="info" size="small" @click.stop="handleUpClick(item.id)">
              <n-icon size="20">
                <ArrowUpOutlined />
              </n-icon>
            </n-button>
          </n-space>
        </div>
        <n-form-item :label="item.label">
          <n-input v-if="item.value === '0'" />
          <n-input-number v-else-if="item.value === '1'" />

          <n-radio-group name="radiogroup" v-else-if="item.value === '2'">
            <n-space>
              <n-radio v-for="song in songs" :key="song.value" :value="song.value">
                {{ song.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
          <n-rate v-else-if="item.value === '3'" />
          <n-select
            v-else-if="item.value === '4'"
            :options="[
              {
                label: 'select',
                value: 'select',
              },
            ]"
          />
          <n-slider v-else-if="item.value === '5'" />
          <n-switch v-else-if="item.value === '6'" />
          <n-time-picker v-else-if="item.value === '7'" />
          <n-tree-select
            v-else-if="item.value === '8'"
            :options="[
              {
                label: 'tree',
                key: 'tree',
                children: [
                  {
                    label: 'tree-select',
                    key: 'tree-select',
                  },
                ],
              },
            ]"
          />
          <n-upload v-else-if="item.value === '9'">
            <n-button>上传文件</n-button>
          </n-upload>
          <n-color-picker v-else-if="item.value === '10'" />
          <n-checkbox v-else-if="item.value === '11'" />
        </n-form-item>
      </n-card>
    </n-space>
  </n-form>
</template>

<style>
.buttons {
  position: absolute;
  top: 100%;
  left: 80%;
  transform: translateY(-50%);
}
</style>
