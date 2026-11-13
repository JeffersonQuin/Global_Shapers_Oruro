<template>
  <div class="opportunity-detail-view">
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
    </div>

    <div v-else-if="opportunity">
      <section class="relative h-96 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div class="absolute inset-0 flex items-end">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {{ getTypeLabel(opportunity.opportunity_type) }}
              </span>
              <span :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                opportunity.status === 'open' ? 'bg-green-500' : 'bg-gray-500'
              ]">
                {{ opportunity.status === 'open' ? 'Abierto' : 'Cerrado' }}
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              {{ opportunity.title }}
            </h1>
          </div>
        </div>
      </section>

      <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="prose prose-lg max-w-none mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
                <div class="text-gray-700 whitespace-pre-line">{{ opportunity.description }}</div>
              </div>

              <div v-if="opportunity.requirements" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
                <div class="text-gray-700 whitespace-pre-line">{{ opportunity.requirements }}</div>
              </div>

              <div v-if="opportunity.application_process" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Proceso de Aplicación</h2>
                <div class="text-gray-700 whitespace-pre-line">{{ opportunity.application_process }}</div>
              </div>

              <div v-if="opportunity.benefits" class="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Beneficios</h2>
                <div class="text-gray-700 whitespace-pre-line">{{ opportunity.benefits }}</div>
              </div>
            </div>

            <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Detalles</h3>
                
                <div class="space-y-4">
                  <div v-if="opportunity.application_deadline">
                    <div class="text-sm text-gray-600 mb-1">Fecha Límite</div>
                    <div class="font-medium text-gray-900">
                      {{ formatDate(opportunity.application_deadline) }}
                    </div>
                  </div>

                  <div v-if="opportunity.time_commitment">
                    <div class="text-sm text-gray-600 mb-1">Compromiso de Tiempo</div>
                    <div class="font-medium text-gray-900">{{ opportunity.time_commitment }}</div>
                  </div>

                  <div v-if="opportunity.category_name">
                    <div class="text-sm text-gray-600 mb-1">Categoría</div>
                    <div class="font-medium text-gray-900">{{ opportunity.category_name }}</div>
                  </div>
                </div>

                <div v-if="opportunity.application_link && opportunity.status === 'open'" class="mt-6">
                  <a
                    :href="opportunity.application_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block w-full px-4 py-3 bg-primary-600 text-white text-center rounded-lg font-medium hover:bg-primary-700 transition"
                  >
                    Aplicar Ahora
                  </a>
                </div>

                <div class="mt-4">
                  <router-link
                    to="/oportunidades"
                    class="block w-full px-4 py-3 border border-gray-300 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Ver Más Oportunidades
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOpportunities } from '@/composables/useOpportunities'

const route = useRoute()
const { opportunity, loading, fetchOpportunityBySlug } = useOpportunities()

const slug = computed(() => route.params.slug as string)

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    call: 'Convocatoria',
    volunteer: 'Voluntariado',
    workshop: 'Taller',
    scholarship: 'Beca',
    event: 'Evento',
    other: 'Otro',
  }
  return labels[type] || type
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  await fetchOpportunityBySlug(slug.value)
})
</script>
