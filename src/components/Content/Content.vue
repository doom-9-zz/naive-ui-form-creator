<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { CopyOutlined, DeleteOutlined } from '@vicons/antd'
import type { State } from '../../store/index'
import DraggableItem from './components/DraggableItem.vue'
import Drop from './components/Drop.vue'

const store = useStore<State>()
const formItemArray = computed(() => {
  return store.state.formItemArray
})
const formConfig = computed(() => {
  return store.state.formConfig
})
const handleAddClick = () => {
  store.commit('add', {
    value: '0',
  })
}
const handleRemoveClick = (id: string) => {
  store.commit('remove', id)
}
const handleCopyClick = (id: string) => {
  store.commit('copy', id)
}
const setSelectedFormItem = (id: string) => {
  store.commit('changeSelectedFormItem', id)
  store.commit('changeTabsValue', 'formItem')
}
const selectedFormItem = computed(() => {
  return store.state.selectedFormItem
})
</script>

<template>
  <n-divider title-placement="left">
    {{ $t('preview') }}
  </n-divider>
  <n-empty v-if="formItemArray.length === 0" :description="$t('addFormItem')">
    <template #extra>
      <n-button @click="handleAddClick">
        {{ $t('add') }}
      </n-button>
    </template>
  </n-empty>
  <n-form
    v-else
    :label-placement="formConfig.labelPlacement"
    :size="formConfig.size"
    :label-width="formConfig.labelWidth"
    :label-align="formConfig.labelAlign"
    :show-feedback="formConfig.showFeedback"
    :show-label="formConfig.showLabel"
    :show-require-mark="formConfig.showRequireMark"
    :require-mark-placement="formConfig.requireMarkPlacement"
  >
    <Drop>
      <DraggableItem
        v-for="item in formItemArray"
        :id="item.id"
        :key="item.id"
        :style="{
          marginBottom: '15px',
        }"
      >
        <n-card
          :content-style="`cursor: pointer; ${
            selectedFormItem === item.id ? 'border: 1px solid #18a058;' : ''
          }`"
          @click="setSelectedFormItem(item.id)"
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
            </n-space>
          </div>
          <n-form-item :label="$t(item.formItemConfig.label)">
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
              :show-button="item.formItemConfig.showButton"
            />
            <n-radio-group v-else-if="item.value === '2'" :size="item.formItemConfig.size">
              <n-space>
                <n-radio
                  v-for="item2 in item.formItemConfig.options ?? [
                    {
                      value: 'demo',
                      label: 'demo',
                    },
                  ]"
                  :key="item2.value"
                  :value="item2.value"
                >
                  {{ item2.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
            <n-rate
              v-else-if="item.value === '3'"
              :count="item.formItemConfig.count"
              :size="item.formItemConfig.size"
              :allow-half="item.formItemConfig.allowHalf"
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
              :default-value="[0, 0]"
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
              :use-12-hours="item.formItemConfig.use12Hours"
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
              :default-upload="item.formItemConfig.defaultUpload"
              :list-type="item.formItemConfig.listType"
              :max="item.formItemConfig.max"
              :method="item.formItemConfig.method"
              :multiple="item.formItemConfig.multiple"
              :name="item.formItemConfig.fileName"
              :with-credentials="item.formItemConfig.withCredentials"
              :show-cancel-button="item.formItemConfig.showCancelButton"
              :show-download-button="item.formItemConfig.showDownloadButton"
              :show-remove-button="item.formItemConfig.showRemoveButton"
              :show-retry-button="item.formItemConfig.showRetryButton"
              :show-file-list="item.formItemConfig.showFileList"
            >
              <n-button>上传文件</n-button>
            </n-upload>
            <n-color-picker
              v-else-if="item.value === '10'"
              :size="item.formItemConfig.size"
              :modes="item.formItemConfig.modes"
              :show-alpha="item.formItemConfig.showAlpha"
              :actions="item.formItemConfig.actions"
            />
            <n-checkbox-group
              v-else-if="item.value === '11'"
              :max="item.formItemConfig.max"
              :min="item.formItemConfig.min"
            >
              <n-space item-style="display: flex;">
                <n-checkbox
                  v-for="item2 in item.formItemConfig.options ?? [{ label: 'demo', value: 'demo' }]"
                  :key="item2.value"
                  :value="item2.value"
                  :label="item2.label"
                />
              </n-space>
            </n-checkbox-group>
            <n-date-picker
              v-else-if="item.value === '12'"
              :actions="item.formItemConfig.actions"
              :clearable="item.formItemConfig.clearable"
              :format="item.formItemConfig.format"
              :size="item.formItemConfig.size"
              :placeholder="item.formItemConfig.placeholder"
              :type="item.formItemConfig.type"
              :start-placeholder="item.formItemConfig.startPlaceholder"
              :end-placeholder="item.formItemConfig.endPlaceholder"
              :separator="item.formItemConfig.separator"
            />
            <n-divider
              v-else-if="item.value === '13'"
              :dashed="item.formItemConfig.dashed"
              :vertical="item.formItemConfig.vertical"
              :title-placement="item.formItemConfig.titlePlacement"
            >
              {{ item.formItemConfig.name }}
            </n-divider>
          </n-form-item>
        </n-card>
      </DraggableItem>
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
