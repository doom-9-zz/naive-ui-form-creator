import { Ref, ref, watch } from 'vue';

import { store } from '../../store/index';

export const useConfig = <T = Record<string, any>>(): Ref<T> => {
  const Config = ref({ ...store.getters.formItemConfig });

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
