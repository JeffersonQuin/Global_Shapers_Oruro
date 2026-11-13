<template>
  <router-link
    :to="`/oportunidades/${opportunity.slug}`"
    class="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary-200"
  >
    <div class="p-6">
      <!-- Type and Status -->
      <div class="flex items-center justify-between mb-3">
        <BaseBadge :variant="getTypeVariant(opportunity.opportunity_type)" size="sm">
          {{ getTypeLabel(opportunity.opportunity_type) }}
        </BaseBadge>
        <BaseBadge :variant="opportunity.status === 'open' ? 'success' : 'gray'" size="sm">
          {{ opportunity.status === 'open' ? 'Abierto' : 'Cerrado' }}
        </BaseBadge>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
        {{ opportunity.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ opportunity.description }}
      </p>

      <!-- Details -->
      <div class="space-y-2 mb-4">
        <!-- Deadline -->
        <div v-if="opportunity.application_deadline" class="flex items-center text-sm">
          <ClockIcon class="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
          <span class="text-gray-600">
            Fecha límite: 
            <span :class="isDeadlineSoon(opportunity.application_deadline) ? 'text-red-600 font-medium' : 'text-gray-900'">
              {{ formatDate(opportunity.application_deadline) }}
            </span>
          </span>
        </div>

        <!-- Time Commitment -->
        <div v-if="opportunity.time_commitment" class="flex items-center text-sm text-gray-600">
          <CalendarDaysIcon class="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
          <span>{{ opportunity.time_commitment }}</span>
        </div>

        <!-- Category -->
        <div v-if="opportunity.category_name" class="flex items-center text-sm text-gray-600">
          <TagIcon class="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
          <span>{{ opportunity.category_name }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="opportunity.tags && opportunity.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
        <span
          v-for="tag in opportunity.tags.slice(0, 3)"
          :key="tag"
          class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
        >
          {{ tag }}
        </span>
        <span v-if="opportunity.tags.length > 3" class="inline-block px-2 py-1 text-xs text-gray-500">
          +{{ opportunity.tags.length - 3 }}
        </span>
      </div>

      <!-- Arrow Icon -->
      <div class="mt-4 flex items-center text-primary-600 font-medium text-sm">
        <span>{{ opportunity.status === 'open' ? 'Aplicar ahora' : 'Ver detalles' }}</span>
        <ArrowRightIcon class="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Opportunity } from '@/types'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  TagIcon, 
  ArrowRightIcon 
} from '@heroicons/vue/24/outline'

interface Props {
  opportunity: Opportunity
}

defineProps<Props>()

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

function getTypeVariant(type: string): 'primary' | 'secondary' | 'success' | 'warning' | 'info' {
  const variants: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
    call: 'primary',
    volunteer: 'success',
    workshop: 'secondary',
    scholarship: 'warning',
    event: 'info',
    other: 'primary',
  }
  return variants[type] || 'primary'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-BO', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

function isDeadlineSoon(dateString: string): boolean {
  const deadline = new Date(dateString)
  const now = new Date()
  const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return daysUntilDeadline <= 7 && daysUntilDeadline >= 0
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
