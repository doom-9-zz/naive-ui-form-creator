/* eslint-disable react/no-string-refs */
import type { PropType } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Fragment, defineComponent, h, ref, watchEffect } from 'vue'
import type { CheckboxGroupProps, FormInst, FormProps } from 'naive-ui'
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
  NRate,
  NSelect,
  NSpace,
  NSwitch,
  NTimePicker,
  NUpload,
} from 'naive-ui'
import type { FormValidateCallback } from 'naive-ui/es/form/src/interface'
import type { ProFormItem } from '../../types/props'

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
        obj[item.key] = null
      })

      return obj
    }

    const modalData = ref<Record<string, any>>(getObj(props.formItems))

    const formRef = ref<FormInst | null>(null)

    const handleValidateClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors)
          props?.onFinish && props.onFinish()
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
      val: string | number | null | (string | number)[],
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

    return {
      modalData,
      formRef,
      handleValidateClick,
      handleInputUpdateValue,
      handleRadioUpdateChecked,
      handleResetClick,
      handleSubmitClick,
    }
  },
  render() {
    const {
      formItems,
      formProps,
      modalData,
      handleValidateClick,
      handleInputUpdateValue,
      handleRadioUpdateChecked,
      handleResetClick,
      handleSubmitClick,
      resetButton,
      validateButton,
      submitButton,
      title,
    } = this

    return (
      <Fragment>
        {title ? <NDivider>{title}</NDivider> : null}
        <NForm {...formProps} model={modalData} ref="formRef">
          {formItems?.map(item => (
            <NFormItem
              {...item.formItemProps}
              key={item.key}
              label={item.label}
              path={item.key}
            >
              {item.type === 'input'
                ? (
                <NInput
                  {...item.props}
                  value={modalData[item.key]}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                />
                  )
                : item.type === 'inputNumber'
                  ? (
                <NInputNumber
                  {...item.props}
                  value={modalData[item.key]}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                />
                    )
                  : item.type === 'radio'
                    ? (
                        item.valueEnum.map(valueItem => (
                  <NRadio
                    {...item.props}
                    {...valueItem}
                    key={valueItem.value}
                    checked={valueItem.value === modalData[item.key]}
                    onUpdateChecked={(value) => {
                      handleRadioUpdateChecked(
                        value,
                        item.key,
                        valueItem.value,
                      )
                    }}
                  />
                        ))
                      )
                    : item.type === 'select'
                      ? (
                <NSelect
                  {...item.props}
                  options={item.valueEnum}
                  value={modalData[item.key]}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                />
                        )
                      : item.type === 'rate'
                        ? (
                <NRate
                  {...item.props}
                  value={modalData[item.key]}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                />
                          )
                        : item.type === 'switch'
                          ? (
                <NSwitch
                  {...item.props}
                  value={modalData[item.key]}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                />
                            )
                          : item.type === 'timePicker'
                            ? (
                <NTimePicker
                  {...item.props}
                  value={modalData[item.key]}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                />
                              )
                            : item.type === 'datePicker'
                              ? (
                <NDatePicker
                  {...item.props}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                  value={modalData[item.key]}
                />
                                )
                              : item.type === 'colorPicker'
                                ? (
                <NColorPicker
                  {...item.props}
                  onUpdateValue={(value) => {
                    handleInputUpdateValue(value, item.key)
                  }}
                  value={modalData[item.key]}
                />
                                  )
                                : item.type === 'checkbox'
                                  ? (
                                      item.valueEnum.length > 1
                                        ? (
                  <NCheckboxGroup
                    {...(item.props as Omit<
                      CheckboxGroupProps,
                      'onUpdateValue' | 'value'
                    >)}
                    onUpdateValue={(value) => {
                      handleInputUpdateValue(value, item.key)
                    }}
                    value={modalData[item.key]}
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
                      value={modalData[item.key]}
                    />
                                            ))
                                          )
                                    )
                                  : item.type === 'upload'
                                    ? (
                <NUpload {...item.props}>
                  <NButton>{item.buttonText}</NButton>
                </NUpload>
                                      )
                                    : null}
            </NFormItem>
          ))}
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
