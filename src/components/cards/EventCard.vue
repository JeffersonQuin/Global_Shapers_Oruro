<template>
  <router-link
    :to="`/eventos/${event.slug}`"
    class="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <!-- Image -->
    <div class="relative h-48 bg-gray-200 overflow-hidden">
      <img
        v-if="event.featured_image_url"
        :src="event.featured_image_url"
        :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-400 to-secondary-600">
        <span class="text-white text-6xl font-bold opacity-20">GS</span>
      </div>
      
      <!-- Featured Badge -->
      <div v-if="event.is_featured" class="absolute top-4 left-4">
        <BaseBadge variant="warning" size="sm">
          ⭐ Destacado
        </BaseBadge>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Category -->
      <div v-if="event.category_name" class="mb-2">
        <BaseBadge variant="secondary" size="sm">
          {{ event.category_name }}
        </BaseBadge>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
        {{ event.title }}
      </h3>

      <!-- Date and Time -->
      <div class="space-y-2 mb-4">
        <div class="flex items-center text-sm text-gray-600">
          <CalendarIcon class="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{{ formatDate(event.start_datetime) }}</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <ClockIcon class="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{{ formatTime(event.start_datetime) }}</span>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <MapPinIcon class="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{{ getLocationLabel(event) }}</span>
        </div>
      </div>

      <!-- Arrow Icon -->
      <div class="mt-4 flex items-center text-primary-600 font-medium text-sm">
        <span>Ver detalles</span>
        <ArrowRightIcon class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Event } from '@/types'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { CalendarIcon, ClockIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

interface Props {
  event: Event
}

defineProps<Props>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-BO', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('es-BO', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

function getLocationLabel(event: Event): string {
  if (event.location_type === 'virtual') {
    return 'Evento Virtual'
  } else if (event.location_type === 'hybrid') {
    return 'Híbrido (Presencial y Virtual)'
  } else if (event.location_address) {
    return event.location_address
  }
  return 'Por confirmar'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
