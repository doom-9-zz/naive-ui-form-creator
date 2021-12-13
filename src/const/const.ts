import { State } from '../store';

type selectItem = Array<{
  value: string;
  formItemConfig: {
    [key: string]: any;
  };
}>;

export const options: selectItem = [
  {
    value: '0',
    formItemConfig: {
      label: '文本输入',
      name: undefined,
      clearable: false,
      maxlength: undefined,
      minlength: undefined,
      type: 'text',
      size: 'medium',
    },
  },
  {
    value: '1',
    formItemConfig: {
      label: '数字输入',
      name: undefined,
      clearable: false,
      max: undefined,
      min: undefined,
      type: 'text',
      size: 'medium',
      step: 1,
      showButton: true,
    },
  },
  {
    value: '2',
    formItemConfig: {
      label: '单选',
      name: undefined,
      size: 'medium',
      options: [],
    },
  },
  {
    value: '3',
    formItemConfig: {
      label: '评分',
      name: undefined,
      size: 'medium',
      count: 5,
      allowHalf: false,
    },
  },
  {
    value: '4',
    formItemConfig: {
      label: '选择器',
      name: undefined,
      size: 'medium',
      multiple: false,
      placeholder: '请选择',
      clearable: false,
      options: [],
    },
  },
  {
    value: '5',
    formItemConfig: {
      label: '滑动选择',
      name: undefined,
      max: 100,
      min: 0,
      step: 1,
      range: false,
      reverse: false,
      vertical: false,
      tooltip: true,
    },
  },
  {
    value: '6',
    formItemConfig: {
      label: '开关',
      name: undefined,
      round: true,
      size: 'medium',
    },
  },
  {
    value: '7',
    formItemConfig: {
      label: '时间选择器',
      name: undefined,
      actions: [],
      clearable: false,
      format: 'HH:mm:ss',
      size: 'medium',
      placeholder: '请选择时间',
      use12Hours: false,
    },
  },
  {
    value: '12',
    formItemConfig: {
      label: '日期选择器',
      name: undefined,
      actions: [],
      clearable: false,
      format: '',
      size: 'medium',
      placeholder: '选择',
      type: 'date',
      startPlaceholder: '开始',
      endPlaceholder: '结束',
      separator: '至',
    },
  },
  {
    value: '8',
    formItemConfig: {
      label: '树形选择',
      name: undefined,
      size: 'medium',
      clearable: false,
    },
  },
  {
    value: '9',
    formItemConfig: {
      label: '上传',
      name: undefined,
      accept: undefined,
      action: undefined,
      defaultUpload: true,
      data: [],
      headers: [],
      listType: 'text',
      max: undefined,
      method: 'POST',
      multiple: false,
      fileName: 'file',
      withCredentials: false,
      showCancelButton: true,
      showDownloadButton: false,
      showRemoveButton: true,
      showRetryButton: true,
      showFileList: true,
    },
  },
  {
    value: '10',
    formItemConfig: {
      label: '颜色选择器',
      name: undefined,
      size: 'medium',
      modes: [],
      showAlpha: true,
      actions: [],
    },
  },
  {
    value: '11',
    formItemConfig: {
      label: '复选框',
      name: undefined,
      max: undefined,
      min: undefined,
      options: [],
    },
  },
];

export const LayoutOptions: selectItem = [
  {
    value: '13',
    formItemConfig: {
      label: '分割线',
      name: undefined,
      dashed: false,
      vertical: false,
      titlePlacement: 'center',
    },
  },
];

export const initialFormState: State['formConfig'] = {
  labelPlacement: 'left',
  labelWidth: '80',
  labelAlign: 'left',
  showRequireMark: false,
  size: 'medium',
  inline: false,
  showFeedback: true,
  showLabel: true,
  requireMarkPlacement: 'right',
  model: undefined,
};

export const UI_NAME = 'naive-ui';
export const PREFIX = 'n';

export const getItemConfig = (
  value: string,
): {
  [key: string]: any;
} => {
  const mergeOptions = [...options, ...LayoutOptions];
  const config = mergeOptions.find(item => item.value === value);
  if (config !== undefined) {
    return config.formItemConfig;
  }
  return {};
};
