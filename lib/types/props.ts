import type {
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  RateProps,
  SelectProps,
} from 'naive-ui'

type addFormItemProps<T extends Record<string, any>> = T & {
  formItemProps?: Omit<FormItemProps, 'label' | 'path'>
  label: string
  key: string
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
    props?: Omit<
        RadioProps,
        'label' | 'value' | 'checked' | 'onUpdateChecked'
      >
    valueEnum: {
      label: string
      value: string | number
    }[]
    group: boolean
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

export type ProFormItemType = 'input' | 'radio'
