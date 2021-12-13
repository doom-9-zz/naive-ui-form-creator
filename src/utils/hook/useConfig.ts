import { Ref, ref, watch } from 'vue';

import { store } from '../../store/index';

export const useConfig = <T = Record<string, any>>(option: { sync?: boolean }): Ref<T> => {
  const Config = ref({ ...store.getters.formItemConfig });

  if (option.sync === undefined || option.sync) {
    watch(
      Config,
      () => {
        store.commit('changeSelectedFormItemConfig', Config.value);
      },
      {
        deep: true,
      },
    );
  }

  return Config;
};
