import { PREFIX, UI_NAME } from '../const/const';
import { formItemType, store } from '../store';

interface bindConfig {
  name: string;
  val: any;
}

// formItemConfig

const getTypeToFormItem = (item: formItemType): string => {
  const type = item.value;
  const formItemConfig = getFormItemConfig(item);
  const formItemContentConfig = getFormItemContentConfig(item.formItemConfig, type);
  switch (type) {
    case '0':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-input ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '1':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-input-number ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '2':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-radio-group ${formItemContentConfig}>
          <${PREFIX}-space>
            ${
              item.formItemConfig.options !== undefined
                ? (item.formItemConfig.options as Array<{ label: string; value: string }>)
                    .map(
                      (option: { value: string; label: string }) =>
                        `<${PREFIX}-radio value="${option.value}">${option.label}</${PREFIX}-radio>`,
                    )
                    .join('')
                : ''
            }
          </${PREFIX}-space>
        </${PREFIX}-radio-group>
      </${PREFIX}-form-item>`;
    case '3':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-rate ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '4':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-select ${formItemContentConfig} />
      </${PREFIX}-form-item>`;
    case '5':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-slider ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '6':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-switch ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '7':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-time-picker ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '8':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
          <${PREFIX}-tree-select ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '9':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-upload ${formItemContentConfig}>
          <${PREFIX}-button>上传文件</${PREFIX}-button>
        </${PREFIX}-upload>
      </${PREFIX}-form-item>`;
    case '10':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-color-picker ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    case '11':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-checkbox-group ${formItemContentConfig}>
          <${PREFIX}-space item-style="display: flex;">
            ${
              item.formItemConfig.options !== undefined
                ? (item.formItemConfig.options as Array<{ label: string; value: string }>)
                    .map(
                      (option: { value: string; label: string }) =>
                        `<${PREFIX}-checkbox value="${option.value}" label="${option.label}"/>`,
                    )
                    .join('')
                : ''
            }
          </${PREFIX}-space>
        </${PREFIX}-checkbox-group>
      </${PREFIX}-form-item>`;
    case '13':
      return `
        <${PREFIX}-divider ${formItemContentConfig}>${
        (item.formItemConfig.name as string) ?? ''
      }</${PREFIX}-divider>`;
    case '12':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-date-picker ${formItemContentConfig}/>
      </${PREFIX}-form-item>`;
    default:
      return '';
  }
};

const getFormItemConfig = (item: formItemType): string => {
  return `label="${item.formItemConfig.label as string}" path="${
    item.formItemConfig.name as string
  }"`;
};

const getFormItemContentConfig = (item: { [key: string]: any }, type: string): string => {
  if (Object.keys(item).length === 0) {
    return '';
  }
  switch (type) {
    case '0':
      return getInputFormItemContentConfig(item);
    case '1':
      return getInputNumberFormItemContentConfig(item);
    case '2':
      return getRadioFormItemContentConfig(item);
    case '3':
      return getRateFormItemContentConfig(item);
    case '4':
      return getSelectFormItemContentConfig(item);
    case '5':
      return getSliderFormItemContentConfig(item);
    case '6':
      return getSwitchFormItemContentConfig(item);
    case '7':
      return getTimePickerFormItemContentConfig(item);
    case '8':
      return getTreeSelectFormItemContentConfig(item);
    case '9':
      return getUploadFormItemContentConfig(item);
    case '10':
      return getColorPickerFormItemContentConfig(item);
    case '11':
      return getCheckBoxFormItemContentConfig(item);
    case '12':
      return getDatePickerFormItemContentConfig(item);
    case '13':
      return getDividerContentConfig(item);
    default:
      return ``;
  }
};

const getInputFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, clearable, maxlength, minlength, type, size } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('clearable', clearable),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('maxlength', maxlength),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('minlength', minlength))} ${bindStringConfig(
    combineNameAndValue('type', type),
  )} ${bindStringConfig(combineNameAndValue('size', size))}`;
};

const getInputNumberFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, clearable, max, min, size, step, showButton } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('clearable', clearable),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('max', max))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('min', min),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('step', step))} ${bindStringConfig(
    combineNameAndValue('size', size),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('show-button', showButton))}`;
};

const getRadioFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, size } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindStringConfig(
    combineNameAndValue('size', size),
  )}`;
};

const getRateFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, size, count, allowHalf } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindStringConfig(
    combineNameAndValue('size', size),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('count', count),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('allow-half', allowHalf))}`;
};

const getSelectFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, size, multiple, placeholder, clearable, options } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindStringConfig(
    combineNameAndValue('size', size),
  )} ${bindStringConfig(
    combineNameAndValue('placeholder', placeholder),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('multiple', multiple),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('clearable', clearable),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('options', replaceOptions(JSON.stringify(options))),
  )}`;
};

const getSliderFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, max, min, step, range, reverse, vertical, tooltip } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('max', max),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('min', min))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('step', step),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('range', range),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('reverse', reverse),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('vertical', vertical),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('tooltip', tooltip))}`;
};

const getSwitchFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, round, size } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('round', round),
  )} ${bindStringConfig(combineNameAndValue('size', size))}`;
};

const getTimePickerFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, size, actions, clearable, format, placeholder, use12Hours } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('clearable', clearable),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('use-12-hours', use12Hours),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('actions', JSON.stringify(actions)),
  )} ${bindStringConfig(combineNameAndValue('format', format))} ${bindStringConfig(
    combineNameAndValue('placeholder', placeholder),
  )} ${bindStringConfig(combineNameAndValue('size', size))}`;
};

const getTreeSelectFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, size, clearable } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('clearable', clearable),
  )} ${bindStringConfig(combineNameAndValue('size', size))}`;
};

const getUploadFormItemContentConfig = (item: { [key: string]: any }): string => {
  const {
    name,
    accept,
    action,
    defaultUpload,
    data,
    headers,
    listType,
    max,
    method,
    multiple,
    fileName,
    withCredentials,
    showCancelButton,
    showDownloadButton,
    showRemoveButton,
    showRetryButton,
    showFileList,
  } = item;
  const handledDate: Record<string, string> = {};
  const handledHeaders: Record<string, string> = {};
  (
    data as Array<{
      key: string;
      value: string;
    }>
  ).map(item => {
    return (handledDate[item.key] = item.value);
  });
  (
    headers as Array<{
      key: string;
      value: string;
    }>
  ).map(item => {
    return (handledHeaders[item.key] = item.value);
  });
  return `${bindFileListConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('default-upload', defaultUpload),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('data', JSON.stringify(handledDate)),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('headers', JSON.stringify(handledHeaders)),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-cancel-button', showCancelButton),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-download-button', showDownloadButton),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-remove-button', showRemoveButton),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-retry-button', showRetryButton),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-file-list', showFileList),
  )} ${bindStringConfig(combineNameAndValue('accept', accept))} ${bindStringConfig(
    combineNameAndValue('action', action),
  )} ${bindStringConfig(combineNameAndValue('list-type', listType))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('max', max),
  )} ${bindStringConfig(combineNameAndValue('method', method))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('multiple', multiple),
  )} ${bindStringConfig(combineNameAndValue('name', fileName))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('with-credentials', withCredentials),
  )}`;
};

const getCheckBoxFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, max, min } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('max', max),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('min', min))}`;
};

const getColorPickerFormItemContentConfig = (item: { [key: string]: any }): string => {
  const { name, size, modes, showAlpha, actions } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('modes', JSON.stringify(modes)),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('showAlpha', showAlpha),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('actions', JSON.stringify(actions)),
  )} ${bindStringConfig(combineNameAndValue('size', size))}`;
};

const getDividerContentConfig = (item: { [key: string]: any }): string => {
  const { dashed, vertical, titlePlacement } = item;
  return `${bindBooleanAndNumberConfig(
    combineNameAndValue('dashed', dashed),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('vertical', vertical))} ${bindStringConfig(
    combineNameAndValue('title-placement', titlePlacement),
  )}`;
};

const getDatePickerFormItemContentConfig = (item: { [key: string]: any }): string => {
  const {
    name,
    clearable,
    format,
    size,
    actions,
    placeholder,
    type,
    startPlaceholder,
    endPlaceholder,
    separator,
  } = item;
  return `${bindValueConfig(combineNameAndValue('name', name))} ${bindBooleanAndNumberConfig(
    combineNameAndValue('actions', JSON.stringify(actions)),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('clearable', clearable))} ${bindStringConfig(
    combineNameAndValue('format', format),
  )} ${bindStringConfig(combineNameAndValue('size', size))} ${bindStringConfig(
    combineNameAndValue('placeholder', placeholder),
  )} ${bindStringConfig(combineNameAndValue('type', type))} ${bindStringConfig(
    combineNameAndValue('start-placeholder', startPlaceholder),
  )} ${bindStringConfig(combineNameAndValue('end-placeholder', endPlaceholder))} ${bindStringConfig(
    combineNameAndValue('separator', separator),
  )}`;
};

const getFormItemImport = (data: formItemType[]): string => {
  const prefix = PREFIX.toUpperCase();
  const { confirmAndCancelBtn } = store.state;
  const array: string[] = [];
  data.forEach(item => {
    return typeToImport[item.value].forEach(importItem => {
      array.push(`${prefix}${importItem} ,`);
    });
  });
  // button
  if (confirmAndCancelBtn) {
    ['Button', 'Space'].forEach(item => {
      array.push(`${prefix}${item} ,`);
    });
  }
  return `${Array.from(new Set(array)).join('')}`;
};

// bind

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

const bindBooleanAndNumberConfig = (config: bindConfig): string => {
  return `${config.val !== undefined ? `:${String(config.name)}="${String(config.val)}"` : ''}`;
};

const bindStringConfig = (config: bindConfig): string => {
  return `${config.val !== undefined ? `${String(config.name)}="${String(config.val)}"` : ''}`;
};

const bindValueConfig = (config: bindConfig): string => {
  return `${
    config.val !== undefined
      ? `v-model="${
          store.state.formConfig.model !== undefined ? store.state.formConfig.model + '.' : ''
        }${String(config.val)}"`
      : ''
  }`;
};

const bindFileListConfig = (config: bindConfig): string => {
  return `${config.val !== undefined ? `v-model:file-list="${String(config.val)}"` : ''}`;
};

const replaceOptions = (str: string): string => {
  return str.replace(/"label"/g, 'label').replace(/"value"/g, 'value');
};

// formConfig

const getFormConfig = (): string => {
  const {
    size,
    inline,
    labelWidth,
    labelAlign,
    labelPlacement,
    showFeedback,
    showLabel,
    showRequireMark,
    requireMarkPlacement,
    model,
  } = store.state.formConfig;

  return `${bindBooleanAndNumberConfig(combineNameAndValue('model', model))} ${bindStringConfig(
    combineNameAndValue('size', size),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('inline', inline),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('label-width', labelWidth),
  )} ${bindStringConfig(combineNameAndValue('label-align', labelAlign))} ${bindStringConfig(
    combineNameAndValue('label-placement', labelPlacement),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-feedback', showFeedback),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-label', showLabel),
  )} ${bindBooleanAndNumberConfig(
    combineNameAndValue('show-require-mark', showRequireMark),
  )} ${bindBooleanAndNumberConfig(combineNameAndValue('rules', 'rules'))} ${bindStringConfig(
    combineNameAndValue('require-mark-placement', requireMarkPlacement),
  )}`;
};

// import

const typeToImport: Record<string, string[]> = {
  0: ['Input'],
  1: ['InputNumber'],
  2: ['Radio', 'RadioGroup', 'Space'],
  3: ['Rate'],
  4: ['Select'],
  5: ['Slider'],
  6: ['Switch'],
  7: ['TimePicker'],
  8: ['TreeSelect'],
  9: ['Upload'],
  10: ['ColorPicker'],
  11: ['Checkbox', 'CheckboxGroup', 'Space'],
  12: ['DatePicker'],
  13: ['Divider'],
};

const getImport = (data: formItemType[]): string => {
  const prefix = PREFIX.toUpperCase();
  if (store.state.autoAddImport) {
    const importStr = `
<script setup type="ts">
  import { ${getFormItemImport(data)} ${prefix}Form, ${prefix}FormItem } from '${UI_NAME}';
</script>
    `;
    return importStr;
  }

  return '';
};

// confirmAndCancelButton

const getConfirmAndCancelButton = (): string => {
  const { confirmAndCancelBtn } = store.state;
  if (confirmAndCancelBtn) {
    return `
      <${PREFIX}-form-item>
        <${PREFIX}-space justify="center">
          <${PREFIX}-button @click="handleValidateClick">确认</${PREFIX}-button>
          <${PREFIX}-button>取消</${PREFIX}-button>
        </${PREFIX}-space>
      </${PREFIX}-form-item>`;
  }
  return '';
};

// rules

const getRulesObject = (data: formItemType[]): string => {
  const rulesArray: string[] = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const rules = data[i].formItemConfig.rules as string[];
    const itemRulesArray: string[] = [];

    for (let i = 0; i < rules.length; i++) {
      const element = rules[i];
      switch (element) {
        case '0':
          itemRulesArray.push(
            `{ required: true, message: '请输入${
              item.formItemConfig.label as string
            }', trigger: 'blur' },`,
          );
          break;
        case '1':
          itemRulesArray.push(
            `{ validator: (rule,value)=>{
              let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])d{8}$/;
              if(!reg.test(value)){
                return new Error('请输入正确的手机号码');
              }
              return true;
            }, message: '请输入正确的${item.formItemConfig.label as string}', trigger: 'blur' },`,
          );
          break;
        default:
          break;
      }
    }

    rulesArray.push(`${item.formItemConfig.name as string}: [
      ${itemRulesArray.join('')}
    ],`);
  }

  return `
  const rules = {
    ${rulesArray.join('')}
  }
`;
};

// entry
export const generateCode = (data: formItemType[]): string => {
  let Code: string = `<template>
    <${PREFIX}-form ${getFormConfig()}>${data.map(item => getTypeToFormItem(item)).join('')}
    ${getConfirmAndCancelButton()}
    </${PREFIX}-form>
</template>`;

  Code = Code.concat(getScriptCode(data));

  return Code;
};

const getScriptCode = (data: formItemType[]): string => {
  return `
  <script setup type="ts">
    ${getImport(data)}
    ${getRulesObject(data)}
  </script>
      `;
};

// normal

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

export function getParentElement(element: HTMLElement | null): HTMLElement | null {
  if (element === null) {
    return null;
  }
  let currElement: HTMLElement | null = element;
  while (currElement != null) {
    if (currElement.dataset.drag === 'doom') {
      return currElement;
    }
    currElement = currElement.parentElement;
  }
  return null;
}
