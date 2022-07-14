/* eslint-disable react/no-string-refs */
import type { ComputedRef, PropType } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Fragment, computed, defineComponent, h, ref, watchEffect } from 'vue'
import type {
  CheckboxGroupProps,
  FormInst,
  FormProps,
  RadioGroupProps,
} from 'naive-ui'
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NColorPicker,
  NDatePicker,
  NDivider,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NRate,
  NSelect,
  NSlider,
  NSpace,
  NSwitch,
  NTimePicker,
  NUpload,
} from 'naive-ui'
import type { FormValidateCallback } from 'naive-ui/es/form/src/interface'
import type { FileInfo } from 'naive-ui/es/upload/src/interface'
import type { ProFormItem } from './types/props'

const ProFormProps = {
  formProps: Object as PropType<Omit<FormProps, 'model'>>,
  formItems: Array as PropType<ProFormItem[]>,
  resetButton: Boolean,
  validateButton: Boolean,
  submitButton: {
    type: Boolean,
    default: true,
  },
  onReset: Function as PropType<() => void>,
  onFinish: Function as PropType<() => void>,
  onError: Function as PropType<FormValidateCallback>,
  onValidate: Function as PropType<() => void>,
  title: String,
  isKeyPressSubmit: Boolean,
}

export default defineComponent({
  name: 'ProForm',
  props: ProFormProps,
  setup(props) {
    const getObj = (data: ProFormItem[] | undefined) => {
      if (!data)
        return {}

      const obj: Record<string, any> = {}

      data.forEach((item) => {
        if (item.type === 'divider')
          return
        obj[item.key] = null
      })

      return obj
    }

    const modalData = ref<Record<string, any>>(getObj(props.formItems))

    const formRef = ref<FormInst | null>(null)

    const handleValidateClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors)
          props?.onValidate && props.onValidate()
        else props?.onError && props.onError(errors)
      })
    }

    const handleResetClick = () => {
      for (const key in modalData.value) {
        if (Object.prototype.hasOwnProperty.call(modalData.value, key))
          modalData.value[key] = null
      }
      props?.onReset && props.onReset()
    }

    const handleSubmitClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          props?.onFinish && props.onFinish()
          console.log(modalData.value)
        }
        else {
          props?.onError && props.onError(errors)
        }
      })
    }

    const handleInputUpdateValue = (
      val: string | number | null | (string | number)[] | Required<FileInfo>[],
      key: string,
    ) => {
      modalData.value[key] = val
    }

    const handleRadioUpdateChecked = (
      val: boolean,
      key: string,
      flag: string | number,
    ) => {
      if (val)
        modalData.value[key] = flag
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter')
        handleSubmitClick()
    }

    watchEffect(() => {
      if (props.isKeyPressSubmit)
        window.addEventListener('keydown', keyDownHandler)
      else window.removeEventListener('keydown', keyDownHandler)
    })

    const getNFormItemVnode: (
      item: ProFormItem
    ) => JSX.Element | JSX.Element[] | undefined = (item) => {
      switch (item.type) {
        case 'input':
          return (
            <NInput
              {...item.props}
              value={modalData.value[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )
        case 'inputNumber':
          return (
            <NInputNumber
              {...item.props}
              value={modalData.value[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'radio':
          return item.valueEnum.length > 1
            ? (
            <NRadioGroup
              {...(item.props as RadioGroupProps)}
              value={modalData.value[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            >
              {item.valueEnum.map(valueItem => (
                <NRadio {...valueItem} key={valueItem.value} />
              ))}
            </NRadioGroup>
              )
            : (
                item.valueEnum.map(valueItem => (
              <NRadio
                {...item.props}
                {...valueItem}
                key={valueItem.value}
                checked={valueItem.value === modalData.value[item.key]}
                onUpdateChecked={(value) => {
                  handleRadioUpdateChecked(value, item.key, valueItem.value)
                }}
              />
                ))
              )

        case 'select':
          return (
            <NSelect
              {...item.props}
              options={item.valueEnum}
              value={modalData.value[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'rate':
          return (
            <NRate
              {...item.props}
              value={modalData.value[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'switch':
          return (
            <NSwitch
              {...item.props}
              value={modalData.value[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'timePicker':
          return (
            <NTimePicker
              {...item.props}
              value={modalData.value[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'datePicker':
          return (
            <NDatePicker
              {...item.props}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData.value[item.key]}
            />
          )

        case 'colorPicker':
          return (
            <NColorPicker
              {...item.props}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData.value[item.key]}
            />
          )

        case 'checkbox':
          return item.valueEnum.length > 1
            ? (
            <NCheckboxGroup
              {...(item.props as Omit<
                CheckboxGroupProps,
                'onUpdateValue' | 'value'
              >)}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData.value[item.key]}
            >
              {item.valueEnum.map(valueItem => (
                <NCheckbox key={valueItem.value} {...valueItem} />
              ))}
            </NCheckboxGroup>
              )
            : (
                item.valueEnum.map(valueItem => (
              <NCheckbox
                {...item.props}
                key={valueItem.value}
                {...valueItem}
                onUpdateChecked={(value) => {
                  handleInputUpdateValue(value, item.key)
                }}
                value={modalData.value[item.key]}
              />
                ))
              )

        case 'upload':
          return (
            <NUpload
              {...item.props}
              fileList={modalData.value[item.key] ?? []}
              onUpdateFileList={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            >
              <NButton>{item.buttonText}</NButton>
            </NUpload>
          )

        case 'slider':
          return (
            <NSlider
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData.value[item.key]}
            />
          )

        default:
          return undefined
      }
    }

    const Vnode: ComputedRef<JSX.Element[] | undefined> = computed(() => {
      const { formItems } = props
      return formItems?.map((item) => {
        if (item.type === 'divider') {
          return (
            <NDivider
              dashed={item.dashed}
              titlePlacement={item.titlePlacement}
              vertical={item.vertical}
            >
              {item.text}
            </NDivider>
          )
        }
        else {
          return (
            <NFormItem
              {...item.formItemProps}
              key={item.key}
              label={item.label}
              path={item.key}
            >
              {getNFormItemVnode(item)}
            </NFormItem>
          )
        }
      })
    })

    return {
      modalData,
      formRef,
      handleValidateClick,
      handleInputUpdateValue,
      handleRadioUpdateChecked,
      handleResetClick,
      handleSubmitClick,
      Vnode,
    }
  },
  render() {
    const {
      formProps,
      modalData,
      handleValidateClick,
      handleResetClick,
      handleSubmitClick,
      resetButton,
      validateButton,
      submitButton,
      title,
      Vnode,
    } = this

    return (
      <Fragment>
        {title ? <NDivider>{title}</NDivider> : null}
        <NForm {...formProps} model={modalData} ref="formRef">
          {Vnode}
        </NForm>
        <NSpace justify="center">
          {validateButton === true
            ? (
            <NButton onClick={handleValidateClick} type="warning">
              验证
            </NButton>
              )
            : null}
          {resetButton === true
            ? (
            <NButton onClick={handleResetClick} type="error">
              重置
            </NButton>
              )
            : null}
          {submitButton === true
            ? (
            <NButton onClick={handleSubmitClick} type="primary">
              提交
            </NButton>
              )
            : null}
        </NSpace>
      </Fragment>
    )
  },
})
