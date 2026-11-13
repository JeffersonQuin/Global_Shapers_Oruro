<template>
  <div class="initiative-detail-view">
    <!-- Loading State -->
    <LoadingSpinner v-if="loading" center text="Cargando iniciativa..." />

    <!-- Error State -->
    <ErrorMessage v-else-if="error" :message="error" variant="error" class="max-w-7xl mx-auto px-4 py-8" />

    <!-- Content -->
    <div v-else-if="initiative">
      <!-- Hero Section with Image -->
      <section class="relative h-96 bg-gray-900">
        <img
          v-if="initiative.featured_image_url"
          :src="initiative.featured_image_url"
          :alt="initiative.title"
          class="w-full h-full object-cover opacity-70"
        />
        <div v-else class="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 opacity-70"></div>
        
        <div class="absolute inset-0 flex items-end">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div class="flex items-center gap-3 mb-4">
              <BaseBadge v-if="initiative.category_name" variant="primary" size="lg">
                {{ initiative.category_name }}
              </BaseBadge>
              <BaseBadge :variant="getStatusVariant(initiative.status)" size="lg">
                {{ getStatusLabel(initiative.status) }}
              </BaseBadge>
              <BaseBadge v-if="initiative.is_featured" variant="warning" size="lg">
                ⭐ Destacado
              </BaseBadge>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              {{ initiative.title }}
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              {{ initiative.short_description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2">
              <!-- Description -->
              <div class="prose prose-lg max-w-none mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Sobre este Proyecto</h2>
                <div class="text-gray-700 whitespace-pre-line">
                  {{ initiative.full_description }}
                </div>
              </div>

              <!-- Image Gallery -->
              <div v-if="initiative.gallery_images && initiative.gallery_images.length > 0" class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Galería</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <img
                    v-for="(image, index) in initiative.gallery_images"
                    :key="index"
                    :src="image"
                    :alt="`Imagen ${index + 1}`"
                    class="w-full h-48 object-cover rounded-lg hover:opacity-90 transition cursor-pointer"
                  />
                </div>
              </div>

              <!-- Impact Metrics -->
              <div v-if="initiative.impact_metrics && Object.keys(initiative.impact_metrics).length > 0" class="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Impacto Generado</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div v-for="(value, key) in initiative.impact_metrics" :key="key" class="text-center">
                    <div class="text-3xl font-bold text-primary-600 mb-1">{{ value }}</div>
                    <div class="text-sm text-gray-600 capitalize">{{ formatMetricKey(key) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Detalles del Proyecto</h3>
                
                <div class="space-y-4">
                  <!-- Dates -->
                  <div v-if="initiative.start_date">
                    <div class="text-sm text-gray-600 mb-1">Fecha de Inicio</div>
                    <div class="flex items-center text-gray-900">
                      <CalendarIcon class="h-5 w-5 mr-2 text-primary-600" />
                      <span class="font-medium">{{ formatDate(initiative.start_date) }}</span>
                    </div>
                  </div>

                  <div v-if="initiative.end_date">
                    <div class="text-sm text-gray-600 mb-1">Fecha de Finalización</div>
                    <div class="flex items-center text-gray-900">
                      <CalendarIcon class="h-5 w-5 mr-2 text-primary-600" />
                      <span class="font-medium">{{ formatDate(initiative.end_date) }}</span>
                    </div>
                  </div>

                  <!-- Duration -->
                  <div v-if="initiative.start_date && initiative.end_date">
                    <div class="text-sm text-gray-600 mb-1">Duración</div>
                    <div class="flex items-center text-gray-900">
                      <ClockIcon class="h-5 w-5 mr-2 text-primary-600" />
                      <span class="font-medium">{{ calculateDuration(initiative.start_date, initiative.end_date) }}</span>
                    </div>
                  </div>

                  <!-- Views -->
                  <div>
                    <div class="text-sm text-gray-600 mb-1">Visualizaciones</div>
                    <div class="flex items-center text-gray-900">
                      <EyeIcon class="h-5 w-5 mr-2 text-primary-600" />
                      <span class="font-medium">{{ initiative.view_count }}</span>
                    </div>
                  </div>
                </div>

                <!-- CTA Buttons -->
                <div class="mt-6 space-y-3">
                  <BaseButton to="/participa" variant="primary" size="lg" full-width>
                    Participa con Nosotros
                  </BaseButton>
                  <BaseButton to="/iniciativas" variant="outline" size="lg" full-width>
                    Ver Más Iniciativas
                  </BaseButton>
                </div>

                <!-- Share -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <div class="text-sm text-gray-600 mb-2">Compartir</div>
                  <div class="flex gap-2">
                    <button class="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                      <ShareIcon class="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Initiatives -->
      <section v-if="relatedInitiatives.length > 0" class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Iniciativas Relacionadas</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InitiativeCard
              v-for="related in relatedInitiatives"
              :key="related.id"
              :initiative="related"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useInitiatives } from '@/composables/useInitiatives'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import InitiativeCard from '@/components/cards/InitiativeCard.vue'
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  ShareIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const {
  initiative,
  initiatives: relatedInitiatives,
  loading,
  error,
  fetchInitiativeBySlug,
  fetchInitiatives,
} = useInitiatives()

const slug = computed(() => route.params.slug as string)

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    planned: 'Planificado',
    active: 'Activo',
    completed: 'Completado',
    paused: 'Pausado',
  }
  return labels[status] || status
}

function getStatusVariant(status: string): 'success' | 'warning' | 'info' | 'gray' {
  const variants: Record<string, 'success' | 'warning' | 'info' | 'gray'> = {
    planned: 'info',
    active: 'success',
    completed: 'gray',
    paused: 'warning',
  }
  return variants[status] || 'info'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' })
}

function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const months = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
  
  if (months < 1) {
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return `${days} día${days !== 1 ? 's' : ''}`
  }
  
  return `${months} mes${months !== 1 ? 'es' : ''}`
}

function formatMetricKey(key: string): string {
  return key.replace(/_/g, ' ')
}

onMounted(async () => {
  await fetchInitiativeBySlug(slug.value)
  
  // Fetch related initiatives from same category
  if (initiative.value?.category_id) {
    await fetchInitiatives({ categoryId: initiative.value.category_id })
    // Filter out current initiative
    relatedInitiatives.value = relatedInitiatives.value.filter(i => i.id !== initiative.value?.id).slice(0, 3)
  }
})
</script>
