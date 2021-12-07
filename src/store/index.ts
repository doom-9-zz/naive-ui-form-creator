import { createStore } from 'vuex';
import { initialFormState } from '../const/const';
import { v4 as uuidv4 } from 'uuid';

export interface formItemType {
  label: string;
  value: string;
  id: string;
  formItemConfig: {
    [key: string]: any;
  };
}

export interface State {
  formItemArray: formItemType[];
  selectedFormItem: string;
  selectedFormItemType: string;
  autoAddImport: boolean;
  formConfig: {
    labelPlacement: 'left' | 'top';
    labelWidth: string;
    labelAlign: 'left' | 'right';
    size: 'small' | 'medium' | 'large';
    inline: boolean;
    showFeedback: boolean;
    showLabel: boolean;
    showRequireMark: boolean;
    requireMarkPlacement: 'left' | 'right';
  };
}

export const store = createStore<State>({
  strict: true,
  state() {
    return {
      formItemArray: [],
      autoAddImport: false,
      formConfig: initialFormState,
      selectedFormItem: '',
      selectedFormItemType: '',
    };
  },
  mutations: {
    add(state, payload: Omit<formItemType, 'id' | 'formItemConfig'>): void {
      const id = uuidv4();
      state.formItemArray.push({
        id,
        formItemConfig: {},
        ...payload,
      });
      window.$message.success('操作成功');
    },
    addAndSelect(state, payload: Omit<formItemType, 'id' | 'formItemConfig'>): void {
      const id = uuidv4();
      state.formItemArray.push({
        id,
        formItemConfig: {},
        ...payload,
      });
      store.commit('changeSelectedFormItem', id);
      window.$message.success('操作成功');
    },
    remove(state, payload: string): void {
      state.formItemArray.splice(
        state.formItemArray.findIndex(item => item.id === payload),
        1,
      );
      window.$message.success('操作成功');
    },
    clear(state): void {
      state.formItemArray = [];
    },
    copy(state, payload: string): void {
      const index = state.formItemArray.findIndex(item => item.id === payload);
      if (index !== -1) {
        const newItem = { ...state.formItemArray[index] };
        newItem.id = uuidv4();
        state.formItemArray.splice(index + 1, 0, newItem);
      }
      window.$message.success('操作成功');
    },
    up(state, payload: string) {
      const index = state.formItemArray.findIndex(item => item.id === payload);
      if (index > 0) {
        const item = state.formItemArray[index];
        state.formItemArray.splice(index, 1);
        state.formItemArray.splice(index - 1, 0, item);
      } else {
        window.$message.warning('已经是第一个了');
      }
    },
    down(state, payload: string) {
      const index = state.formItemArray.findIndex(item => item.id === payload);
      if (index < state.formItemArray.length - 1) {
        const item = state.formItemArray[index];
        state.formItemArray.splice(index, 1);
        state.formItemArray.splice(index + 1, 0, item);
      } else {
        window.$message.warning('已经是最后一个了');
      }
    },
    changeAutoAddImport(state, payload: boolean) {
      state.autoAddImport = payload;
      window.$message.success('操作成功');
    },
    changeFormConfig(state, payload: Partial<State['formConfig']>) {
      state.formConfig = {
        ...state.formConfig,
        ...payload,
      };
      window.$message.success('操作成功');
    },
    changeSelectedFormItem(state, payload: string) {
      state.selectedFormItem = payload;
      const index = state.formItemArray.findIndex(item => item.id === payload);
      if (index !== -1) {
        state.selectedFormItemType = state.formItemArray[index].value;
      }
    },
    changeSelectedFormItemConfig(state, payload: formItemType['formItemConfig']) {
      const index = state.formItemArray.findIndex(item => item.id === state.selectedFormItem);
      if (index !== -1) {
        state.formItemArray[index].formItemConfig = {
          ...state.formItemArray[index].formItemConfig,
          ...payload,
        };
        state.formItemArray[index].label = payload.label;
        window.$message.success('操作成功');
      } else {
        window.$message.warning('请先选中一个表单项');
      }
    },
  },
  getters: {
    formItemArrayLength(state) {
      return state.formItemArray.length;
    },
    formItemConfig(state) {
      return state.formItemArray.find(item => item.id === state.selectedFormItem)?.formItemConfig;
    },
  },
});
