import { ref, computed } from 'vue';

export function useSalesFilter(sales) {
  const filterCurator = ref('');
  const sortOrder = ref('asc');

  const uniqueCurators = computed(() => {
    const curators = sales.value.map(sale => ({ name: sale.curator }))
    return [...new Set(curators.map((curator) => curator.name))].map((name) => ({ name }))
  });

  const filteredSales = computed(() => {
    return sales.value.filter(sale => {
      return !filterCurator.value || sale.curator.toLowerCase().includes(filterCurator.value.toLowerCase());
    });
  });

  const sortedSales = computed(() => {
    return filteredSales.value.slice().sort((a, b) => {
      if (sortOrder.value === 'asc') {
        return a.efficiency - b.efficiency;
      } else {
        return b.efficiency - a.efficiency;
      }
    });
  });

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  };

  const sortOrderText = computed(() => (sortOrder.value === 'asc' ? 'по возрастанию' : 'по убыванию'));

  return {
    filterCurator,
    sortOrder,
    uniqueCurators,
    sortedSales,
    toggleSortOrder,
    sortOrderText
  };
}
