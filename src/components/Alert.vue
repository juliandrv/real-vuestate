<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <v-alert class="mt-8" type="error" :title="title"></v-alert>
</template>
