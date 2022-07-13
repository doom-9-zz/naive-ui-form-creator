import type { PropType } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineComponent, h, reactive, ref } from 'vue'
import type { FormProps } from 'naive-ui'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NRadio,
  NSelect,
} from 'naive-ui'
import type { ProFormItem } from '../../types/props'

const ProFormProps = {
  formProps: Object as PropType<Omit<FormProps, 'model'>>,
  formItems: Array as PropType<ProFormItem[]>,
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

    const handleValidateClick = () => {
      // console.log(modalData.value)
    }

    const handleResetClick = () => {
      for (const key in modalData.value) {
        if (Object.prototype.hasOwnProperty.call(modalData.value, key))
          modalData.value[key] = ''
      }
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
      handleValidateClick,
      handleInputUpdateValue,
      handleRadioUpdateChecked,
      handleResetClick,
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
    } = this

    return (
      <NForm {...formProps} model={modalData}>
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
                    handleRadioUpdateChecked(value, item.key, valueItem.value)
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
                    : null}
          </NFormItem>
        ))}
        <NFormItem>
          <NButton onClick={handleValidateClick}>验证</NButton>
          <NButton onClick={handleResetClick}>重置</NButton>
        </NFormItem>
      </NForm>
    )
  },
})
