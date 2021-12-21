declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: (target: string) => string;
  }
}

export {};
