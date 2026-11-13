<template>
  <router-link
    :to="`/iniciativas/${initiative.slug}`"
    class="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <!-- Image -->
    <div class="relative h-48 bg-gray-200 overflow-hidden">
      <img
        v-if="initiative.featured_image_url"
        :src="initiative.featured_image_url"
        :alt="initiative.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
        <span class="text-white text-6xl font-bold opacity-20">GS</span>
      </div>
      
      <!-- Status Badge -->
      <div class="absolute top-4 right-4">
        <BaseBadge :variant="getStatusVariant(initiative.status)" size="sm">
          {{ getStatusLabel(initiative.status) }}
        </BaseBadge>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Category -->
      <div v-if="initiative.category_name" class="mb-2">
        <BaseBadge variant="primary" size="sm">
          {{ initiative.category_name }}
        </BaseBadge>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
        {{ initiative.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ initiative.short_description }}
      </p>

      <!-- Dates -->
      <div v-if="initiative.start_date" class="flex items-center text-sm text-gray-500">
        <CalendarIcon class="h-4 w-4 mr-1" />
        <span>{{ formatDate(initiative.start_date) }}</span>
        <span v-if="initiative.end_date" class="mx-1">-</span>
        <span v-if="initiative.end_date">{{ formatDate(initiative.end_date) }}</span>
      </div>

      <!-- Arrow Icon -->
      <div class="mt-4 flex items-center text-primary-600 font-medium text-sm">
        <span>Ver más</span>
        <ArrowRightIcon class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Initiative } from '@/types'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { CalendarIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

interface Props {
  initiative: Initiative
}

defineProps<Props>()

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
  return date.toLocaleDateString('es-BO', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
