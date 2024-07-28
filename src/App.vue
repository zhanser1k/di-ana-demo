<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue';

const route = useRoute()
const router = useRouter()
const isLoginRoute = computed(() => route.name === 'login')


const logout = () => {
  localStorage.clear()
  router.replace({ name: 'login' })
}
</script>

<template>
  <header v-if="!isLoginRoute" class="h-14 w-full flex items-center px-16 border-b border-gray-200 justify-between">
    <img class="h-12" src="https://static.tildacdn.pro/tild6239-3964-4366-a535-303365343262/logo-1.png" alt="logo">
    <button @click="logout" class="text-lg text-blue-400 hover:underline">Выйти</button>
  </header>
  <RouterView />
</template>
