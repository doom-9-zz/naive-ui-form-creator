import { App } from 'vue';

const getOptionsValue = (
  target: string,
  local: string | undefined,
  options: Record<string, any>,
): string => {
  const targetSplitArray = target.split('.');
  if (local === undefined) return '';
  targetSplitArray.unshift(local);
  let current = options;
  while (targetSplitArray.length > 0) {
    current = current[targetSplitArray[0]];
    if (current === undefined) {
      return '';
    }
    targetSplitArray.shift();
  }
  if (typeof current === 'string') {
    return current;
  }
  return '';
};

export default {
  install: (app: App, options: Record<string, any>) => {
    app.config.globalProperties.$t = (target: string, local: string | undefined): string => {
      return getOptionsValue(target, local, options);
    };
  },
};
