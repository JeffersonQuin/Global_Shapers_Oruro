<template>
  <div class="events-view">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">Eventos y Actividades</h1>
        <p class="text-xl text-secondary-100">
          Participa en nuestros eventos y conecta con la comunidad
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="bg-white border-b sticky top-16 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div class="w-full md:w-96">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar eventos..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                @input="handleSearch"
              />
              <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 text-sm"
              @change="applyFilters"
            >
              <option value="">Todas las categorías</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>

            <select
              v-model="selectedType"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 text-sm"
              @change="applyFilters"
            >
              <option value="">Todos los tipos</option>
              <option value="physical">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="hybrid">Híbrido</option>
            </select>

            <button
              @click="showUpcomingOnly = !showUpcomingOnly; applyFilters()"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition',
                showUpcomingOnly
                  ? 'bg-secondary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              ]"
            >
              Solo próximos
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoadingSpinner v-if="loading" center text="Cargando eventos..." />
        <ErrorMessage v-else-if="error" :message="error" variant="error" />
        
        <div v-else-if="events.length === 0" class="text-center py-16">
          <CalendarDaysIcon class="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron eventos</h3>
          <p class="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
          <BaseButton @click="clearFilters" variant="outline">Limpiar filtros</BaseButton>
        </div>

        <div v-else>
          <div class="mb-6 text-sm text-gray-600">
            Mostrando {{ events.length }} evento{{ events.length !== 1 ? 's' : '' }}
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard v-for="event in events" :key="event.id" :event="event" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEvents } from '@/composables/useEvents'
import BaseButton from '@/components/ui/BaseButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import EventCard from '@/components/cards/EventCard.vue'
import { MagnifyingGlassIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'

const {
  events,
  categories,
  loading,
  error,
  fetchEvents,
  fetchCategories,
} = useEvents()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedType = ref('')
const showUpcomingOnly = ref(true)

let searchTimeout: ReturnType<typeof setTimeout>

function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

async function applyFilters() {
  await fetchEvents({
    categoryId: selectedCategory.value || undefined,
    locationType: selectedType.value || undefined,
    upcoming: showUpcomingOnly.value,
    search: searchQuery.value || undefined,
  })
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedType.value = ''
  showUpcomingOnly.value = true
  applyFilters()
}

onMounted(async () => {
  await Promise.all([
    fetchEvents({ upcoming: true }),
    fetchCategories(),
  ])
})
</script>
