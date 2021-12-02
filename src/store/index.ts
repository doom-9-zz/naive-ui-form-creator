import { createStore } from 'vuex';
export interface selectItemValue {
  label: string;
  value: string;
  id: string;
}

interface State {
  formItemTypeArray: selectItemValue[];
}

export const store = createStore<State>({
  strict: true,
  state() {
    return {
      formItemTypeArray: [],
    };
  },
  mutations: {
    add(state, payload: selectItemValue): void {
      state.formItemTypeArray.push(payload);
    },
  },
});
