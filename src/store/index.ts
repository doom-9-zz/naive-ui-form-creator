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
    model: string | undefined;
  };
  tabsValue: 'form' | 'formItem';
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
      tabsValue: 'form',
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
    exchange(state, payload: { id1: string; id2: string }) {
      const index1 = state.formItemArray.findIndex(item => item.id === payload.id1);
      const index2 = state.formItemArray.findIndex(item => item.id === payload.id2);
      if (index1 !== -1 && index2 !== -1) {
        const item1 = state.formItemArray[index1];
        const item2 = state.formItemArray[index2];
        state.formItemArray.splice(index1, 1, item2);
        state.formItemArray.splice(index2, 1, item1);
      }
    },
    insertDrop(state, payload: { from: number; to: number }) {
      if (payload.from !== -1 && payload.to !== -1) {
        if (payload.from < payload.to) {
          const item1 = state.formItemArray[payload.from];
          state.formItemArray.splice(payload.from, 1);
          state.formItemArray.splice(payload.to, 0, item1);
        }
        if (payload.from > payload.to) {
          const item1 = state.formItemArray[payload.from];
          state.formItemArray.splice(payload.from, 1);
          state.formItemArray.splice(payload.to, 0, item1);
        }

        // dom diff
        state.formItemArray = state.formItemArray.map((item, index) => {
          item.id = uuidv4();
          return item;
        });
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
    changeTabsValue(state, payload: State['tabsValue']) {
      state.tabsValue = payload;
    },
  },
  getters: {
    formItemArrayLength(state) {
      return state.formItemArray.length;
    },
    formItemConfig(state) {
      return state.formItemArray.find(item => item.id === state.selectedFormItem)?.formItemConfig;
    },
    selectedFormItem(state) {
      const index = state.formItemArray.findIndex(item => item.id === state.selectedFormItem);
      if (index !== -1) {
        return state.formItemArray[index];
      }
      return null;
    },
  },
});
