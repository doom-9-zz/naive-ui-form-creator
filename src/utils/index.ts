import { PREFIX, UI_NAME } from '../const/const';
import { formItemType, store } from '../store';

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

const getTypeToFormItem = (item: formItemType): string => {
  const type = item.value;
  const formItemConfig = getFormItemConfig(item);
  const formItemContentConfig = getFormItemContentConfig(item.formItemConfig, type);
  switch (type) {
    case '0':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-input ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '1':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-input-number />
      </${PREFIX}-form-item>`;
    case '2':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-radio value="radio" name="radio">radio</n-radio>
      </${PREFIX}-form-item>`;
    case '3':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-rate />
      </${PREFIX}-form-item>`;
    case '4':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
          <n-select
          v-else-if="item.value === '4'"
          :options="[
            {
              label: 'select',
              value: 'select',
            },
          ]"
        />
      </${PREFIX}-form-item>`;
    case '5':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-slider />
      </${PREFIX}-form-item>`;
    case '6':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-switch />
      </${PREFIX}-form-item>`;
    case '7':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-time-picker />
      </${PREFIX}-form-item>`;
    case '8':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
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
      </${PREFIX}-form-item>`;
    case '9':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-upload>
          <n-button>上传文件</n-button>
        </n-upload>
      </${PREFIX}-form-item>`;
    case '10':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-color-picker />
      </${PREFIX}-form-item>`;
    case '11':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <n-checkbox />
      </${PREFIX}-form-item>`;
    default:
      return '';
  }
};

const getFormItemConfig = (item: formItemType): string => {
  return `label="${item.label}"`;
};

const getFormItemContentConfig = (item: { [key: string]: any }, type: string): string => {
  if (Object.keys(item).length === 0) {
    return '';
  }
  switch (type) {
    case '0':
      return getInputFormItemContentConfig(item);
    default:
      break;
  }
  return ``;
};

const combineNameAndValue = (
  name: string,
  val: any,
): {
  name: string;
  val: any;
} => {
  return {
    name,
    val,
  };
};

const getInputFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, clearable, maxlength, type, size } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('clearable', clearable),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('maxlength', maxlength))} ${bindStringConfig(
    combineNameAndValue('type', type),
  )} ${bindStringConfig(combineNameAndValue('size', size))}`;
};

interface bindConfig {
  name: string;
  val: any;
}

const bindBooleanAndNumberConfig = (config: bindConfig): string => {
  return `${config.val !== undefined ? `:${String(config.name)}="${String(config.val)}"` : ''}`;
};

const bindStringConfig = (config: bindConfig): string => {
  return `${config.val !== undefined ? `${String(config.name)}="${String(config.val)}"` : ''}`;
};

const bindValueConfig = (config: bindConfig): string => {
  return `${config.val !== undefined ? `v-model="${String(config.val)}"` : ''}`;
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

const getTypeToImport = (data: formItemType[]): string => {
  const prefix = PREFIX.toUpperCase();
  if (store.state.autoAddImport) {
    const importStr = `
<script setup type="ts">
  import { ${Array.from(new Set(data.map(item => `${prefix}${typeToImport[item.value]} ,`))).join(
    '',
  )} ${prefix}Form, ${prefix}FormItem } from '${UI_NAME}';
</script>
    `;

    return importStr;
  }

  return '';
};

export const generateCode = (data: formItemType[]): string => {
  let Code: string = `<template>
    <${PREFIX}-form ${getFormConfig()}>${data.map(item => getTypeToFormItem(item)).join('')}
    </${PREFIX}-form>
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

export function copyPropertyValue<T, K extends keyof T>(obj: T, target: T, key: K): void {
  obj[key] = target[key];
}
