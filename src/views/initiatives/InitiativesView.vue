<template>
  <div class="initiatives-view">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">Iniciativas y Proyectos</h1>
        <p class="text-xl text-primary-100">
          Descubre los proyectos que están transformando nuestra comunidad
        </p>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="bg-white border-b sticky top-16 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <!-- Search -->
          <div class="w-full md:w-96">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar iniciativas..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                @input="handleSearch"
              />
              <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap gap-2">
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              @change="applyFilters"
            >
              <option value="">Todas las categorías</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>

            <select
              v-model="selectedStatus"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              @change="applyFilters"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="completed">Completados</option>
              <option value="planned">Planificados</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <LoadingSpinner v-if="loading" center text="Cargando iniciativas..." />

        <!-- Error State -->
        <ErrorMessage v-else-if="error" :message="error" variant="error" />

        <!-- Empty State -->
        <div v-else-if="initiatives.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpenIcon class="h-12 w-12 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron iniciativas</h3>
          <p class="text-gray-600 mb-6">
            {{ searchQuery || selectedCategory || selectedStatus 
              ? 'Intenta ajustar los filtros de búsqueda' 
              : 'Aún no hay iniciativas publicadas' }}
          </p>
          <BaseButton @click="clearFilters" variant="outline">
            Limpiar filtros
          </BaseButton>
        </div>

        <!-- Initiatives Grid -->
        <div v-else>
          <div class="mb-6 text-sm text-gray-600">
            Mostrando {{ initiatives.length }} iniciativa{{ initiatives.length !== 1 ? 's' : '' }}
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InitiativeCard
              v-for="initiative in initiatives"
              :key="initiative.id"
              :initiative="initiative"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInitiatives } from '@/composables/useInitiatives'
import BaseButton from '@/components/ui/BaseButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import InitiativeCard from '@/components/cards/InitiativeCard.vue'
import { MagnifyingGlassIcon, FolderOpenIcon } from '@heroicons/vue/24/outline'

const {
  initiatives,
  categories,
  loading,
  error,
  fetchInitiatives,
  fetchCategories,
} = useInitiatives()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')

let searchTimeout: ReturnType<typeof setTimeout>

function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

async function applyFilters() {
  await fetchInitiatives({
    categoryId: selectedCategory.value || undefined,
    status: selectedStatus.value || undefined,
    search: searchQuery.value || undefined,
  })
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
  applyFilters()
}

onMounted(async () => {
  await Promise.all([
    fetchInitiatives(),
    fetchCategories(),
  ])
})
</script>
