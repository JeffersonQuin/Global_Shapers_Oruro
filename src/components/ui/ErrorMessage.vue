<template>
  <div
    v-if="message"
    class="rounded-lg p-4"
    :class="variantClasses"
    role="alert"
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon v-if="variant === 'error'" class="h-5 w-5" />
        <ExclamationCircleIcon v-else-if="variant === 'warning'" class="h-5 w-5" />
        <InformationCircleIcon v-else-if="variant === 'info'" class="h-5 w-5" />
        <CheckCircleIcon v-else class="h-5 w-5" />
      </div>
      <div class="ml-3 flex-1">
        <h3 v-if="title" class="font-medium" :class="titleClasses">
          {{ title }}
        </h3>
        <div class="text-sm" :class="{ 'mt-1': title }">
          {{ message }}
        </div>
      </div>
      <button
        v-if="dismissible"
        @click="$emit('dismiss')"
        type="button"
        class="ml-3 flex-shrink-0 inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="dismissClasses"
      >
        <span class="sr-only">Cerrar</span>
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

interface Props {
  message?: string | null
  title?: string
  variant?: 'error' | 'warning' | 'info' | 'success'
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'error',
  dismissible: false,
})

defineEmits<{
  dismiss: []
}>()

const variantClasses = computed(() => {
  const variants = {
    error: 'bg-red-50 text-red-800 border border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
  }
  return variants[props.variant]
})

const titleClasses = computed(() => {
  const variants = {
    error: 'text-red-900',
    warning: 'text-yellow-900',
    info: 'text-blue-900',
    success: 'text-green-900',
  }
  return variants[props.variant]
})

const dismissClasses = computed(() => {
  const variants = {
    error: 'text-red-500 hover:text-red-600 focus:ring-red-500',
    warning: 'text-yellow-500 hover:text-yellow-600 focus:ring-yellow-500',
    info: 'text-blue-500 hover:text-blue-600 focus:ring-blue-500',
    success: 'text-green-500 hover:text-green-600 focus:ring-green-500',
  }
  return variants[props.variant]
})
</script>
