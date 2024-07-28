<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
<!--      <div class="flex mb-8 gap-4">-->
<!--        <div v-if="['ncagip'].includes(role)" class="w-1/3">-->
<!--          <AutocompleteInput-->
<!--            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"-->
<!--            v-if="uniqueCurators.length"-->
<!--            :lists="uniqueCurators"-->
<!--            :clearInputWhenClicked="false"-->
<!--            v-model="filterCurator"-->
<!--            :field="'name'"-->
<!--            placeholder="Поиск по Куратору"-->
<!--            @item-selected="handleCuratorSelected"-->
<!--          >-->
<!--            <template #icon>-->
<!--              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">-->
<!--                <svg-->
<!--                  aria-hidden="true"-->
<!--                  class="w-5 h-5 text-gray-500 dark:text-gray-400"-->
<!--                  fill="currentColor"-->
<!--                  viewbox="0 0 20 20"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                >-->
<!--                  <path-->
<!--                    fill-rule="evenodd"-->
<!--                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"-->
<!--                    clip-rule="evenodd"-->
<!--                  />-->
<!--                </svg>-->
<!--              </div>-->
<!--            </template>-->
<!--          </AutocompleteInput>-->
<!--        </div>-->
<!--        <div v-if="['curator', 'ncagip'].includes(role)" class="w-1/3">-->
<!--          <AutocompleteInput-->
<!--            v-if="uniqueDoctors.length"-->
<!--            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"-->
<!--            :lists="uniqueDoctors"-->
<!--            :clearInputWhenClicked="false"-->
<!--            v-model="filterDoctor"-->
<!--            :field="'name'"-->
<!--            placeholder="Поиск по Врачу"-->
<!--            @item-selected="handleDoctorSelected"-->
<!--          >-->
<!--            <template #icon>-->
<!--              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">-->
<!--                <svg-->
<!--                  aria-hidden="true"-->
<!--                  class="w-5 h-5 text-gray-500 dark:text-gray-400"-->
<!--                  fill="currentColor"-->
<!--                  viewbox="0 0 20 20"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                >-->
<!--                  <path-->
<!--                    fill-rule="evenodd"-->
<!--                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"-->
<!--                    clip-rule="evenodd"-->
<!--                  />-->
<!--                </svg>-->
<!--              </div>-->
<!--            </template>-->
<!--          </AutocompleteInput>-->
<!--        </div>-->
<!--        <div v-if="['curator', 'ncagip'].includes(role)" class="w-1/3">-->
<!--          <AutocompleteInput-->
<!--            v-if="uniqueRegions.length"-->
<!--            input-class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"-->
<!--            :lists="uniqueRegions"-->
<!--            :clearInputWhenClicked="false"-->
<!--            v-model="filterRegion"-->
<!--            :field="'name'"-->
<!--            placeholder="Поиск по региону"-->
<!--            @item-selected="handleRegionSelected"-->
<!--          >-->
<!--            <template #icon>-->
<!--              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">-->
<!--                <svg-->
<!--                  aria-hidden="true"-->
<!--                  class="w-5 h-5 text-gray-500 dark:text-gray-400"-->
<!--                  fill="currentColor"-->
<!--                  viewbox="0 0 20 20"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                >-->
<!--                  <path-->
<!--                    fill-rule="evenodd"-->
<!--                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"-->
<!--                    clip-rule="evenodd"-->
<!--                  />-->
<!--                </svg>-->
<!--              </div>-->
<!--            </template>-->
<!--          </AutocompleteInput>-->
<!--        </div>-->
<!--      </div>-->
<!--      <AllSalesTable :sales="sales" />-->
      <CuratorsTable v-if="props.role === 'ncagip'" :sales="sales" />
      <DoctorsTable v-if="props.role === 'curator'"  :sales="sales" />
    </div>
  </section>
</template>

<script setup>
import AutocompleteInput from '@/components/AutocompleteInput.vue'
import salesJSON from '../fake-backend/sales.json'
import { ref, computed } from 'vue'
import { useSalesFilter } from '@/composables/useSalesFilter.js'
// import AllSalesTable from '@/components/AllSalesTable.vue'
import CuratorsTable from '@/components/CuratorsTable.vue'
import DoctorsTable from '@/components/DoctorsTable.vue';

const sales = ref(salesJSON.sales)
const filterRegion = ref('')

const props = defineProps({
  role: String
})

const {
  filterCurator,
  filterDoctor,
  sortOrder,
  uniqueCurators,
  uniqueDoctors,
  sortedSales,
  averageEfficiencyByDoctor,
  averageEfficiencyByKurator,
  toggleSortOrder,
  sortOrderText
} = useSalesFilter(sales)

const uniqueRegions = computed(() => {
  const regions = sales.value.map((sale) => ({ name: sale.region }))
  return [...new Set(regions.map((region) => region.name))].map((name) => ({ name }))
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
