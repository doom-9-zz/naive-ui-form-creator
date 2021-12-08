<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { DeleteOutlined, CopyOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd';
import { State } from '../../store/index';
import DraggableItem from './components/DraggableItem.vue';
import Drop from './components/Drop.vue';

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
    <Drop>
      <!-- <n-space vertical :size="15"> -->
      <DraggableItem v-for="item in formItemArray" :id="item.id">
        <n-card
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
            <n-input
              v-if="item.value === '0'"
              :clearable="item.formItemConfig.clearable"
              :maxlength="item.formItemConfig.maxlength"
              :type="item.formItemConfig.type"
              :size="item.formItemConfig.size"
            />
            <n-input-number
              v-else-if="item.value === '1'"
              :clearable="item.formItemConfig.clearable"
              :max="item.formItemConfig.max"
              :min="item.formItemConfig.min"
              :size="item.formItemConfig.size"
              :step="item.formItemConfig.step"
              :showButton="item.formItemConfig.showButton"
            />
            <n-radio-group v-else-if="item.value === '2'" :size="item.formItemConfig.size">
              <n-space>
                <n-radio
                  v-for="item in item.formItemConfig.options ?? songs"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
            <n-rate
              v-else-if="item.value === '3'"
              :count="item.formItemConfig.count"
              :size="item.formItemConfig.size"
              :allowHalf="item.formItemConfig.allowHalf"
            />
            <n-select
              v-else-if="item.value === '4'"
              :multiple="item.formItemConfig.multiple"
              :size="item.formItemConfig.size"
              :placeholder="item.formItemConfig.placeholder"
              :clearable="item.formItemConfig.clearable"
              :options="
                item.formItemConfig.options ?? [
                  {
                    label: 'select',
                    value: 'select',
                  },
                ]
              "
            />
            <n-slider
              v-else-if="item.value === '5'"
              :max="item.formItemConfig.max"
              :min="item.formItemConfig.min"
              :step="item.formItemConfig.step"
              :range="item.formItemConfig.range"
              :reverse="item.formItemConfig.reverse"
              :vertical="item.formItemConfig.vertical"
              :tooltip="item.formItemConfig.tooltip"
            />
            <n-switch
              v-else-if="item.value === '6'"
              :round="item.formItemConfig.round"
              :size="item.formItemConfig.size"
            />
            <n-time-picker
              v-else-if="item.value === '7'"
              :size="item.formItemConfig.size"
              :actions="item.formItemConfig.actions"
              :clearable="item.formItemConfig.clearable"
              :format="item.formItemConfig.format"
              :placeholder="item.formItemConfig.placeholder"
              :use12Hours="item.formItemConfig.use12Hours"
            />
            <n-tree-select
              v-else-if="item.value === '8'"
              :size="item.formItemConfig.size"
              :clearable="item.formItemConfig.clearable"
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
            <n-upload
              v-else-if="item.value === '9'"
              :accept="item.formItemConfig.accept"
              :action="item.formItemConfig.action"
              :defaultUpload="item.formItemConfig.defaultUpload"
              :listType="item.formItemConfig.listType"
              :max="item.formItemConfig.max"
              :method="item.formItemConfig.method"
              :multiple="item.formItemConfig.multiple"
              :fileName="item.formItemConfig.fileName"
              :withCredentials="item.formItemConfig.withCredentials"
            >
              <n-button>上传文件</n-button>
            </n-upload>
            <n-color-picker
              v-else-if="item.value === '10'"
              :size="item.formItemConfig.size"
              :modes="item.formItemConfig.modes"
              :showAlpha="item.formItemConfig.showAlpha"
              :actions="item.formItemConfig.actions"
            />
            <n-checkbox-group
              v-else-if="item.value === '11'"
              :max="item.formItemConfig.max"
              :min="item.formItemConfig.min"
            >
              <n-space item-style="display: flex;">
                <n-checkbox
                  v-for="item in item.formItemConfig.options ?? [{ label: 'demo', value: 'demo' }]"
                  :value="item.value"
                  :label="item.label"
                />
              </n-space>
            </n-checkbox-group>
          </n-form-item>
        </n-card>
      </DraggableItem>
      <!-- </n-space> -->
    </Drop>
  </n-form>
</template>

<style scoped>
.buttons {
  position: absolute;
  top: 100%;
  right: 5%;
  transform: translateY(-50%);
}
</style>
