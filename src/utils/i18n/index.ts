import type { App } from 'vue'
import { ref } from 'vue'

interface I18nOptions {
  initial: string
  i18nConfig: Record<string, any>
}

const local = ref<string | undefined>(undefined)

const getOptionsValue = (target: string, options: Record<string, any>): string => {
  const targetSplitArray = target.split('.')
  if (local.value === undefined)
    return ''
  targetSplitArray.unshift(local.value)
  let current = options
  while (targetSplitArray.length > 0) {
    current = current[targetSplitArray[0]]
    if (current === undefined)
      return ''

    targetSplitArray.shift()
  }
  if (typeof current === 'string')
    return current

  return ''
}

export const changeLocal = (value: string): void => {
  local.value = value
}

export default {
  install: (app: App, options: I18nOptions) => {
    local.value = options.initial
    app.config.globalProperties.$t = (target: string): string => {
      return getOptionsValue(target, options.i18nConfig)
    }
  },
}
