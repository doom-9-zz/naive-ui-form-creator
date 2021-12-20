declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t: (target: string, local: string | undefined) => string;
  }
}

export {};
