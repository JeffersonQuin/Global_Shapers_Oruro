<template>
  <div class="opportunities-view">
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">Oportunidades para Jóvenes</h1>
        <p class="text-xl text-primary-100">
          Descubre convocatorias, voluntariados, talleres y más
        </p>
      </div>
    </section>

    <section class="bg-white border-b sticky top-16 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div class="w-full md:w-96">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar oportunidades..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                @input="handleSearch"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
              @change="applyFilters"
            >
              <option value="">Todas las categorías</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>

            <select
              v-model="selectedType"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
              @change="applyFilters"
            >
              <option value="">Todos los tipos</option>
              <option value="call">Convocatoria</option>
              <option value="volunteer">Voluntariado</option>
              <option value="workshop">Taller</option>
              <option value="scholarship">Beca</option>
              <option value="event">Evento</option>
            </select>

            <button
              @click="showOpenOnly = !showOpenOnly; applyFilters()"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition',
                showOpenOnly
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              ]"
            >
              Solo abiertas
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
        
        <div v-else-if="opportunities.length === 0" class="text-center py-16">
          <svg class="h-24 w-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron oportunidades</h3>
          <p class="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
        </div>

        <div v-else>
          <div class="mb-6 text-sm text-gray-600">
            Mostrando {{ opportunities.length }} oportunidad{{ opportunities.length !== 1 ? 'es' : '' }}
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <OpportunityCard v-for="opp in opportunities" :key="opp.id" :opportunity="opp" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useOpportunities } from '@/composables/useOpportunities'
import OpportunityCard from '@/components/cards/OpportunityCard.vue'

const {
  opportunities,
  categories,
  loading,
  fetchOpportunities,
  fetchCategories,
} = useOpportunities()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedType = ref('')
const showOpenOnly = ref(true)

let searchTimeout: NodeJS.Timeout

function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

async function applyFilters() {
  await fetchOpportunities({
    categoryId: selectedCategory.value || undefined,
    opportunityType: selectedType.value || undefined,
    status: showOpenOnly.value ? 'open' : undefined,
    search: searchQuery.value || undefined,
  })
}

onMounted(async () => {
  await Promise.all([
    fetchOpportunities({ status: 'open' }),
    fetchCategories(),
  ])
})
</script>
