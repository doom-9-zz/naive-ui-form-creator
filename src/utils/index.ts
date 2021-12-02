import { selectItemValue } from '../store';

const getTypeToCode = (type: string): string => {
  switch (type) {
    case '0':
      return `
      <n-form-item>
        <n-input />
      </n-form-item>`;
    case '1':
      return `
      <n-form-item>
        <n-input-number />
      </n-form-item>`;
    case '2':
      return `
      <n-form-item>
        <n-radio value="radio" name="radio">radio</n-radio>
      </n-form-item>`;
    case '3':
      return `
      <n-form-item>
        <n-rate />
      </n-form-item>`;
    case '4':
      return `
      <n-form-item>
          <n-select
          v-else-if="item.value === '4'"
          :options="[
            {
              label: 'select',
              value: 'select',
            },
          ]"
        />
      </n-form-item>`;
    case '5':
      return `
      <n-form-item>
        <n-slider />
      </n-form-item>`;
    case '6':
      return `
      <n-form-item>
        <n-switch />
      </n-form-item>`;
    case '7':
      return `
      <n-form-item>
        <n-time-picker />
      </n-form-item>`;
    case '8':
      return `
      <n-form-item>
          <n-tree-select
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
      </n-form-item>`;
    case '9':
      return `
      <n-form-item>
        <n-upload>
          <n-button>上传文件</n-button>
        </n-upload>
      </n-form-item>`;
    case '10':
      return `
      <n-form-item>
        <n-color-picker />
      </n-form-item>`;
    case '11':
      return `
      <n-form-item>
        <n-checkbox />
      </n-form-item>`;
    default:
      return '';
  }
};
export const generateCode = (data: selectItemValue[]): string => {
  const Code: string = `<template>
    <n-form>${data.map(item => getTypeToCode(item.value)).join('')}
    </n-form>
</template>`;

  console.log(Code);

  return Code;
};
