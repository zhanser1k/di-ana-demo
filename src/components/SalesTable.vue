<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="flex mb-8 gap-4">
        <div class="w-1/3">
          <AutocompleteInput
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
            v-if="uniqueCurators.length"
            :lists="uniqueCurators"
            :clearInputWhenClicked="false"
            v-model="filterCurator"
            :field="'name'"
            placeholder="Поиск по Куратору"
            @item-selected="handleCuratorSelected"
          >
            <template #icon>
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </template>
          </AutocompleteInput>
        </div>
        <div class="w-1/3">
          <AutocompleteInput
            v-if="uniqueDoctors.length"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
            :lists="uniqueDoctors"
            :clearInputWhenClicked="false"
            v-model="filterDoctor"
            :field="'name'"
            placeholder="Поиск по Врачу"
            @item-selected="handleDoctorSelected"
          >
            <template #icon>
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </template>
          </AutocompleteInput>
        </div>
        <div class="w-1/3">
          <AutocompleteInput
            v-if="uniqueRegions.length"
            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
            :lists="uniqueRegions"
            :clearInputWhenClicked="false"
            v-model="filterRegion"
            :field="'name'"
            placeholder="Поиск по региону"
            @item-selected="handleRegionSelected"
          >
            <template #icon>
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </template>
          </AutocompleteInput>
        </div>
      </div>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-4 py-3">Куратор</th>
            <th scope="col" class="px-4 py-3">Регион</th>
            <th scope="col" class="px-4 py-3">Роддом</th>
            <th scope="col" class="px-4 py-3">Доктор</th>
            <th role="button" @click="toggleSortOrder"  scope="col" class="px-4 py-3 flex items-center cursor-pointer">
              Эффективность
              <svg
                class="h-4 w-4 ml-1 inline-block"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b dark:border-gray-700"
            v-for="sale in sortedSales"
            :key="`${sale.doctor}_${sale.efficiency}`"
          >
            <td class="px-4 py-3">{{ sale.curator }}</td>
            <td class="px-4 py-3">{{ sale.region }}</td>
            <td class="px-4 py-3">{{ sale.clinic }}</td>
            <td class="px-4 py-3">{{ sale.doctor }}</td>
            <td class="px-4 py-2 font-medium whitespace-nowrap">
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
    </div>
  </section>
</template>

<script setup>
import AutocompleteInput from '@/components/AutocompleteInput.vue'
import salesJSON from '../fake-backend/sales.json'
import { ref, computed } from 'vue'
import { useSalesFilter } from '@/composables/useSalesFilter.js';

const sales = ref(salesJSON.sales)
const filterRegion = ref('')
const filterDoctor = ref('')

const {
  filterCurator,
  uniqueCurators,
  sortedSales,
  toggleSortOrder,
} = useSalesFilter(sales)


const uniqueRegions = computed(() => {
  const regions = sales.value.map((sale) => ({ name: sale.region }))
  return [...new Set(regions.map((region) => region.name))].map((name) => ({ name }))
})

const uniqueDoctors = computed(() => {
  const doctors = sales.value.map((sale) => ({ name: sale.doctor }))
  return [...new Set(doctors.map((doctor) => doctor.name))].map((name) => ({ name }))
})

const handleCuratorSelected = (item) => {
  filterCurator.value = item
}

const handleDoctorSelected = (item) => {
  filterDoctor.value = item
}

const handleRegionSelected = (item) => {
  filterRegion.value = item
}

</script>
