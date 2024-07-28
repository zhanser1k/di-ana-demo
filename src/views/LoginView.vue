<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        Di-Ana.kz
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Вход
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="signIn">
            <div>
              <label for="login" class="block mb-2 text-sm font-medium text-gray-900">Логин</label>
              <input v-model="login" type="text" name="login" id="login" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Логин" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="">
            </div>
            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Войти</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const login = ref('')
const password = ref('')
const router = useRouter()

const signIn = () => {
  if (login.value === 'curator' && password.value === '123123') {
    localStorage.setItem('loggedIn', 'curator')
    goToHome()
  } else if (login.value === 'doctor' && password.value === '123123') {
    localStorage.setItem('loggedIn', 'doctor')
    goToHome()
  } else if (login.value === 'ncagip' && password.value === '123123') {
    localStorage.setItem('loggedIn', 'ncagip')
    goToHome()
  } else {
    alert('Неверный логин или пароль')
  }
}

const goToHome = () => {
  router.replace({ name: 'home' })
}
</script>
