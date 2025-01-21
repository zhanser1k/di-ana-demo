<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      <th scope="col" class="px-4 py-3">Населенный пункт</th>
      <th scope="col" class="px-4 py-3">Мед центр</th>
      <th scope="col" class="px-4 py-3">Кол-во пользователей</th>
      <th scope="col" class="px-4 py-3">Средний прогресс пользователя</th>
      <th scope="col" class="px-4 py-3">Коэффициент охвата на клинику</th>
    </tr>
    </thead>
    <tbody>
    <tr class="border-b dark:border-gray-700" v-for="item in stats" :key="item.progress">
      <td class="px-4 py-3">{{ item.city }}</td>
      <td class="px-4 py-3">{{ item.clinic }}</td>
      <td class="px-4 py-3 text-center">{{ item.count }}</td>

      <td class="px-4 py-3">
        <div class="flex justify-end mb-1">
                <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
                >{{ item.progress }}%</span
                >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div
            :class="{
                    'bg-green-600': item.progress > 60,
                    'bg-yellow-600': item.progress < 60 && item.progress > 30,
                    'bg-red-600': item.progress < 30
                  }"
            class="bg-primary-600 h-1.5 rounded-full"
            :style="`width: ${item.progress}%`"
          ></div>
        </div>
      </td>
      <td class="px-4 py-3 text-center">{{ item.coef }}%</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  stats: Array
})
</script>
