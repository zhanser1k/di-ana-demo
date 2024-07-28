import { ref, computed } from 'vue'

export function useSalesFilter(sales) {
  const filterCurator = ref('')
  const filterDoctor = ref('')
  const sortOrder = ref('asc')

  const uniqueCurators = computed(() => {
    const curators = sales.map((sale) => sale.curator)
    return [...new Set(curators.map((curator) => curator.name))].map((name) => ({ name }))
  })

  const uniqueDoctors = computed(() => {
    const doctors = sales.map((sale) => sale.doctor)
    return [...new Set(doctors.map((doctor) => doctor.name))].map((name) => ({ name }))
  })

  const filteredSales = computed(() => {
    return sales.filter((sale) => {
      const curatorMatch =
        !filterCurator.value ||
        sale.curator.toLowerCase().includes(filterCurator.value.toLowerCase())
      const doctorMatch =
        !filterDoctor.value || sale.doctor.toLowerCase().includes(filterDoctor.value.toLowerCase())
      return curatorMatch && doctorMatch
    })
  })

  const sortedSales = computed(() => {
    return filteredSales.value.slice().sort((a, b) => {
      if (sortOrder.value === 'asc') {
        return a.efficiency - b.efficiency
      } else {
        return b.efficiency - a.efficiency
      }
    })
  })

  const averageEfficiencyByDoctor = computed(() => {
    const doctorEfficiency = {}
    filteredSales.value.forEach((sale) => {
      if (!doctorEfficiency[sale.doctor]) {
        doctorEfficiency[sale.doctor] = {
          totalEfficiency: 0,
          count: 0,
          region: sale.region,
          clinic: sale.clinic,
          totalActivity: 0,
          curator: sale.curator
        }
      }
      doctorEfficiency[sale.doctor].totalEfficiency += sale.efficiency
      doctorEfficiency[sale.doctor].totalActivity += sale.activity
      doctorEfficiency[sale.doctor].count += 1
    })
    return Object.keys(doctorEfficiency).map((doctor) => ({
      curator: doctorEfficiency[doctor].curator,
      doctor,
      region: doctorEfficiency[doctor].region,
      clinic: doctorEfficiency[doctor].clinic,
      averageEfficiency: doctorEfficiency[doctor].totalEfficiency / doctorEfficiency[doctor].count,
      averageActivity: Math.ceil(doctorEfficiency[doctor].totalActivity / doctorEfficiency[doctor].count)
    }))
  })

  const averageEfficiencyByCurator = computed(() => {
    const curatorEfficiency = {}
    filteredSales.value.forEach((sale) => {
      if (!curatorEfficiency[sale.curator]) {
        curatorEfficiency[sale.curator] = { totalEfficiency: 0, count: 0, region: sale.region, totalActivity: 0 }
      }
      curatorEfficiency[sale.curator].totalEfficiency += sale.efficiency
      curatorEfficiency[sale.curator].totalActivity += sale.activity
      curatorEfficiency[sale.curator].count += 1
    })
    return Object.keys(curatorEfficiency).map((curator) => ({
      curator,
      region: curatorEfficiency[curator].region,
      salesCount: curatorEfficiency[curator].count,
      averageEfficiency:
        curatorEfficiency[curator].totalEfficiency / curatorEfficiency[curator].count,
      averageActivity: Math.ceil(curatorEfficiency[curator].totalActivity / curatorEfficiency[curator].count)
    }))
  })

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  const sortOrderText = computed(() =>
    sortOrder.value === 'asc' ? 'по возрастанию' : 'по убыванию'
  )

  return {
    filterCurator,
    filterDoctor,
    sortOrder,
    uniqueCurators,
    uniqueDoctors,
    sortedSales,
    averageEfficiencyByDoctor,
    averageEfficiencyByCurator,
    toggleSortOrder,
    sortOrderText
  }
}
