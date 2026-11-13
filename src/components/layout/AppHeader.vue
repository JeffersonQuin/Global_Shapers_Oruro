<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center space-x-3">
            <img
              src="/Logo.jpg"
              alt="Global Shapers Hub Oruro"
              class="w-10 h-10 rounded-lg object-cover"
            />
            <div class="hidden sm:block">
              <span class="text-xl font-bold text-gray-900">Global Shapers</span>
              <span class="block text-xs text-gray-600">Hub Oruro</span>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            active-class="text-primary-600"
          >
            {{ item.name }}
          </router-link>
          
          <!-- CTA Button -->
          <router-link
            to="/participa"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            Únete
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
            aria-expanded="false"
          >
            <span class="sr-only">Abrir menú</span>
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-show="mobileMenuOpen" class="md:hidden pb-4">
          <div class="space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.path"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
              active-class="text-primary-600 bg-primary-50"
            >
              {{ item.name }}
            </router-link>
            <router-link
              to="/participa"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 mt-2 rounded-lg text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors text-center"
            >
              Únete
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Inicio', path: '/' },
  { name: 'Conoce el Hub', path: '/conoce-el-hub' },
  { name: 'Iniciativas', path: '/iniciativas' },
  { name: 'Eventos', path: '/eventos' },
  { name: 'Oportunidades', path: '/oportunidades' },
  { name: 'Propón una Idea', path: '/proponer-idea' },
  { name: 'Contacto', path: '/contacto' },
]
</script>
