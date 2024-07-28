<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      <th scope="col" class="px-4 py-3">Куратор</th>
      <th scope="col" class="px-4 py-3">Регион</th>
      <th scope="col" class="px-4 py-3">Роддом</th>
      <th scope="col" class="px-4 py-3">Доктор</th>
      <th scope="col" class="px-4 py-3">Средний прогресс (%)</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b dark:border-gray-700" v-for="sale in sortedSales" :key="sale.curator + sale.doctor + sale.patient">
      <td class="px-4 py-3">{{ sale.curator }}</td>
      <td class="px-4 py-3">{{ sale.region }}</td>
      <td class="px-4 py-3">{{ sale.clinic }}</td>
      <td class="px-4 py-3">{{ sale.doctor }}</td>
      <td class="px-4 py-3">
        <div class="flex justify-end mb-1">
                <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
                >{{ sale.efficiency }}%</span
                >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div
            :class="{
                    'bg-green-600': sale.efficiency > 60,
                    'bg-yellow-600': sale.efficiency < 60 && sale.efficiency > 30,
                    'bg-red-600': sale.efficiency < 30
                  }"
            class="bg-primary-600 h-1.5 rounded-full"
            :style="`width: ${sale.efficiency}%`"
          ></div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useSalesFilter } from '../composables/useSalesFilter';

const props = defineProps({
  sales: Array
})

const {
  sortedSales,
} = useSalesFilter(props.sales);
</script>
