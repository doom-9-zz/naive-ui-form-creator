import type {
  CheckboxGroupProps,
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TimePickerProps,
  UploadProps,
} from 'naive-ui'
// import type { FileInfo } from 'naive-ui/es/upload/src/interface'

type addFormItemProps<T extends Record<string, any>> = T & {
  formItemProps?: Omit<FormItemProps, 'label' | 'path'>
  label: string
  key: string
  show?: boolean
}

export type ProFormItem =
  | addFormItemProps<{
    type: 'input'
    props?: Omit<InputProps, 'onUpdateValue' | 'value'>
  }>
  | addFormItemProps<{
    type: 'inputNumber'
    props?: Omit<InputNumberProps, 'onUpdateValue' | 'value'>
  }>
  | addFormItemProps<{
    type: 'radio'
    props?:
    | Omit<RadioProps, 'label' | 'value' | 'checked' | 'onUpdateChecked'>
    | Omit<RadioGroupProps, 'onUpdateValue' | 'value'>
    valueEnum: {
      label: string
      value: string | number
    }[]
    group?: boolean
  }>
  | addFormItemProps<{
    type: 'select'
    props?: Omit<SelectProps, 'onUpdateValue' | 'value' | 'options'>
    valueEnum: {
      label: string
      value: string | number
      disabled: boolean
    }[]
  }>
  | addFormItemProps<{
    type: 'rate'
    props?: Omit<RateProps, 'onUpdateValue' | 'value'>
  }>
  | addFormItemProps<{
    type: 'switch'
    props?: Omit<SwitchProps, 'onUpdateValue' | 'value'>
  }>
  | addFormItemProps<{
    type: 'timePicker'
    props?: Omit<TimePickerProps, 'onUpdateValue' | 'value'>
  }>
  | addFormItemProps<{
    type: 'datePicker'
    props?: Omit<DatePickerProps, 'onUpdateValue' | 'value'>
  }>
  | addFormItemProps<{
    type: 'colorPicker'
    props?: Omit<ColorPickerProps, 'onUpdateValue' | 'value'>
  }>
  | addFormItemProps<{
    type: 'checkbox'
    props?:
    | Omit<
            CheckboxProps,
            'onUpdateChecked' | 'value' | 'label' | 'disabled'
          >
    | Omit<CheckboxGroupProps, 'onUpdateValue' | 'value'>
    valueEnum: {
      label: string
      value: string | number
      disabled: boolean
    }[]
  }>
  | addFormItemProps<{
    type: 'upload'
    props?: Omit<UploadProps, 'fileList' | 'onUpdateFileList'>
    buttonText?: string
  }>
  | addFormItemProps<{
    type: 'slider'
    props?: Omit<SliderProps, 'onUpdateValue' | 'value'>
  }>
  | {
    type: 'divider'
    dashed?: boolean
    titlePlacement?: 'left' | 'right' | 'center'
    vertical?: boolean
    text: string
  }

export type ProFormItemType = 'input' | 'radio'
