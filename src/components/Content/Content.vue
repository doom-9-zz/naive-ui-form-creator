<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import { DeleteOutlined, CopyOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd';

const store = useStore();
const formItemTypeArray = computed(() => {
  return store.state.formItemTypeArray;
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
</script>
<template>
  <n-divider title-placement="left">预览</n-divider>
  <n-empty description="从左侧添加表单项" v-if="formItemTypeArray.length === 0">
    <template #extra>
      <n-button @click="handleAddClick">试着添加一个</n-button>
    </template>
  </n-empty>
  <n-form label-placement="left" v-else>
    <n-space vertical :size="15">
      <n-card v-for="item in formItemTypeArray">
        <div class="buttons">
          <n-space>
            <n-button circle type="primary" size="small" @click="handleCopyClick(item.id)">
              <n-icon size="20">
                <CopyOutlined />
              </n-icon>
            </n-button>
            <n-button circle type="error" size="small" @click="handleRemoveClick(item.id)">
              <n-icon size="20">
                <DeleteOutlined />
              </n-icon>
            </n-button>
            <n-button circle type="info" size="small" @click="handleDownClick(item.id)">
              <n-icon size="20">
                <ArrowDownOutlined />
              </n-icon>
            </n-button>
            <n-button circle type="info" size="small" @click="handleUpClick(item.id)">
              <n-icon size="20">
                <ArrowUpOutlined />
              </n-icon>
            </n-button>
          </n-space>
        </div>

        <n-form-item :label="item.label">
          <n-input v-if="item.value === '0'" />
          <n-input-number v-else-if="item.value === '1'" />
          <n-radio v-else-if="item.value === '2'" value="radio" name="radio">radio</n-radio>
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
