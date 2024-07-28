<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      <th scope="col" class="px-4 py-3">Регион</th>
      <th scope="col" class="px-4 py-3">Куратор</th>
      <th scope="col" class="px-4 py-3">Количество обучающихся</th>
      <th scope="col" class="px-4 py-3">Средний прогресс (%)</th>
      <th scope="col" class="px-4 py-3 text-center">Средняя активность</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b dark:border-gray-700" v-for="item in averageEfficiencyByCurator" :key="item.curator">
      <td class="px-4 py-3">{{ item.region }}</td>
      <td class="px-4 py-3">{{ item.curator }}</td>
      <td class="px-4 py-3">{{ item.salesCount }}</td>
      <td class="px-4 py-3">
        <div class="flex justify-end mb-1">
                <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
                >{{ item.averageEfficiency.toFixed(2) }}%</span
                >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div
            :class="{
                    'bg-green-600': item.averageEfficiency.toFixed(2) > 60,
                    'bg-yellow-600': item.averageEfficiency.toFixed(2) < 60 && item.averageEfficiency.toFixed(2) > 30,
                    'bg-red-600': item.averageEfficiency.toFixed(2) < 30
                  }"
            class="bg-primary-600 h-1.5 rounded-full"
            :style="`width: ${item.averageEfficiency.toFixed(2)}%`"
          ></div>
        </div>
      </td>
      <td class="px-4 py-3"><span class="rounded-full w-4 h-4 bg-yellow-600 block mx-auto"></span></td>
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
  averageEfficiencyByCurator
} = useSalesFilter(props.sales);
</script>
