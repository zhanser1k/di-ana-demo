<script setup>
import SalesTable from '../components/TablesContainer.vue'
import { computed } from 'vue';

const role = computed(() => localStorage.getItem('loggedIn'))
</script>

<template>
  <main>
    <SalesTable :role="role" />
  </main>
</template>
