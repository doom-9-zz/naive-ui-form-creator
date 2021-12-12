<script setup lang="ts"></script>
<template>
  <div
    draggable="true"
    data-drag="doom"
    :style="{
      transition: 'all 0.1s',
    }"
  >
    <slot></slot>
  </div>
</template>
<style scoped></style>
