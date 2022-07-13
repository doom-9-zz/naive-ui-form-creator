/* eslint-disable react/no-string-refs */
import type { PropType } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Fragment, defineComponent, h, ref } from 'vue'
import type { FormInst, FormProps } from 'naive-ui'
import {
  NButton,
  NDivider,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NRadio,
  NRate,
  NSelect,
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
}

export default defineComponent({
  name: 'ProForm',
  props: ProFormProps,
  setup(props) {
    const getObj = (data: ProFormItem[] | undefined) => {
      if (!data)
        return {}

      const obj: Record<string, undefined> = {}

      data.forEach((item) => {
        obj[item.key] = undefined
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
          modalData.value[key] = ''
      }
      props?.onReset && props.onReset()
    }

    const handleSubmitClick = (e: MouseEvent) => {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors)
          props?.onFinish && props.onFinish()
        else props?.onError && props.onError(errors)
      })
    }

    const handleInputUpdateValue = (
      val: string | number | null,
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
              key={item.key}
              {...item.formItemProps}
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
                    label={valueItem.label}
                    value={valueItem.value}
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
                <NRate {...item.props} />
                          )
                        : null}
            </NFormItem>
          ))}
          <NFormItem>
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
          </NFormItem>
        </NForm>
      </Fragment>
    )
  },
})
