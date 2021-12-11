import { Ref, ref, watch } from 'vue';

import { store } from '../../store/index';

export const useConfig = <T = Record<string, any>>(config: T): Ref<T> => {
  const length = Object.keys(store.getters.formItemConfig).length;
  const Config = ref(
    length > 0
      ? { ...store.getters.formItemConfig }
      : { ...config, label: store.getters.selectedFormItem?.label },
  );

  watch(
    Config,
    () => {
      store.commit('changeSelectedFormItemConfig', Config.value);
    },
    {
      deep: true,
    },
  );

  return Config;
};
