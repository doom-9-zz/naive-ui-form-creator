<script setup lang="ts"></script>
<template>
  <div
    draggable="true"
    data-drag="doom"
    :style="{
      marginBottom: '15px',
    }"
  >
    <slot></slot>
  </div>
</template>
<style scoped></style>
