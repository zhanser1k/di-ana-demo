<script setup>
import SalesTable from '../components/TablesContainer.vue'
import salesJSON from '../fake-backend/sales.json'
import { computed, ref } from 'vue';
import { curatorsDict } from '../fake-backend/curators.js';
import { useSalesFilter } from '@/composables/useSalesFilter.js';

const role = computed(() => localStorage.getItem('loggedIn'))
const sales = ref(salesJSON.sales)
const {
  averageEfficiencyByCurator
} = useSalesFilter(sales.value)

const filteredDataByAccount = computed(() => {
  return averageEfficiencyByCurator.value.filter((e) => e.curator === curatorsDict[role.value])
})
</script>

<template>
  <main>
    <div v-if="role !== 'ncagip'" class="mx-auto max-w-screen-xl px-4 lg:px-12 mt-6">
      <h2 class="font-bold text-2xl">Куратор: {{ curatorsDict[role] }}</h2>
      <p class="mt-1">Средний показатель прогресса по вашим регионам: <strong>{{ filteredDataByAccount[0].averageEfficiency }}%</strong></p>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
    </div>
    <SalesTable :role="role" />
  </main>
</template>
