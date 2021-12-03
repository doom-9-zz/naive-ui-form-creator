import { selectItemValue, store } from '../store';

const typeToImport: Record<string, string> = {
  0: 'Input',
  1: 'InputNumber',
  2: 'Radio',
  3: 'Rate',
  4: 'Select',
  5: 'Slider',
  6: 'Switch',
  7: 'TimePicker',
  8: 'TreeSelect',
  9: 'Upload',
  10: 'ColorPicker',
  11: 'Checkbox',
};

const getTypeToFormItem = (type: string): string => {
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

const getFormConfig = (): string => {
  const formConfig = store.state.formConfig;

  return `size="${formConfig.size}" :inline="${String(formConfig.inline)}" :label-width="${
    formConfig.labelWidth
  }" label-align="${formConfig.labelAlign}" label-placement="${
    formConfig.labelPlacement
  }" :show-feedback="${String(formConfig.showFeedback)}" :show-label="${String(
    formConfig.showLabel,
  )}" :show-require-mark="${String(formConfig.showRequireMark)}" require-mark-placement="${
    formConfig.requireMarkPlacement
  }"`;
};

const getTypeToImport = (data: selectItemValue[]): string => {
  if (store.state.autoAddImport) {
    const importStr = `
<script setup type="ts">
  import { ${Array.from(new Set(data.map(item => `N${typeToImport[item.value]} ,`))).join(
    '',
  )} NFrom, NFormItem } from 'naive-ui';
</script>
    `;

    return importStr;
  }
  return '';
};

export const generateCode = (data: selectItemValue[]): string => {
  let Code: string = `<template>
    <n-form ${getFormConfig()}>${data.map(item => getTypeToFormItem(item.value)).join('')}
    </n-form>
</template>`;

  Code = Code.concat(getTypeToImport(data));

  return Code;
};

export const copy = (value: string): void => {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  // 暂时没有可用的替代方法。
  // 确切的说这个 API 本来也不是标准 API，而是一个 IE 的私有 API，在 IE9 时被引入，后续的若干年里陆续被 Chrome / Firefix / Opera 等浏览器也做了兼容支持，但始终没有形成标准。
  // 这个 API 被废弃的主要原因第一个就是安全问题，在用户未经授权的情况下就可以执行一些敏感操作，这就很恐怖了；第二个问题是因为这是一个同步方法，而且操作了 DOM 对象，会阻塞页面渲染和脚本执行，因当初还没 Promise，所以没设计成异步，挖坑了。新设计的 API 肯定是要解决这两个问题。
  // 不过 W3C 也正在拟草案，大概率以后会引入一个叫 Clipboard 的类型（Chrome 66.0 开始已经有这个类型了，不过还不能用，相关 API 仅存在于文档中），用来处理跟剪贴版相关的操作，不过之后肯定会是像现在获取地理位置啊、麦克风啊什么的，浏览器先会弹出一个对话框让用户授权，你才能读写剪贴板了。
  document.execCommand('copy');
  document.body.removeChild(textarea);
};
