<template>
  <div class="participate-view">
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold mb-4">Participa con Nosotros</h1>
        <p class="text-xl text-primary-100">
          Únete a nuestra comunidad de jóvenes líderes y contribuye al desarrollo de Oruro
        </p>
      </div>
    </section>

    <section class="py-12 bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="success" class="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="text-lg font-bold text-green-900 mb-2">¡Solicitud enviada con éxito!</h3>
              <p class="text-green-700">Gracias por tu interés. Nuestro equipo revisará tu solicitud y te contactará pronto.</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">¿Por qué unirte?</h2>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start">
                <svg class="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Sé parte de una red global de jóvenes líderes</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Participa en proyectos de impacto social</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Desarrolla tus habilidades de liderazgo</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Conecta con otros jóvenes comprometidos</span>
              </li>
            </ul>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.full_name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono (opcional)</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Rango de edad (opcional)</label>
                <select
                  v-model="form.age_range"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecciona...</option>
                  <option value="18-22">18-22 años</option>
                  <option value="23-26">23-26 años</option>
                  <option value="27-30">27-30 años</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                ¿Por qué quieres unirte? <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="form.reason_for_interest"
                rows="5"
                required
                placeholder="Cuéntanos qué te motiva a ser parte de Global Shapers..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Áreas de interés <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label v-for="area in interestAreas" :key="area" class="flex items-center">
                  <input
                    type="checkbox"
                    :value="area"
                    v-model="selectedAreas"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ area }}</span>
                </label>
              </div>
              <p v-if="areasError" class="mt-1 text-sm text-red-600">Selecciona al menos un área de interés</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">¿Cómo nos conociste? (opcional)</label>
              <input
                v-model="form.how_heard_about_us"
                type="text"
                placeholder="Ej: Redes sociales, amigos, evento..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {{ error }}
            </div>

            <div class="flex items-start">
              <input
                v-model="acceptPrivacy"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label class="ml-2 text-sm text-gray-700">
                Acepto la política de privacidad y el uso de mis datos <span class="text-red-500">*</span>
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Enviando...</span>
              <span v-else>Enviar Solicitud</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useForms } from '@/composables/useForms'

const { loading, error, success, submitParticipationRequest, resetFormState } = useForms()

const form = ref({
  full_name: '',
  email: '',
  phone: '',
  age_range: '',
  reason_for_interest: '',
  how_heard_about_us: '',
})

const interestAreas = [
  'Proyectos sociales',
  'Educación',
  'Medio ambiente',
  'Salud',
  'Tecnología',
  'Arte y cultura',
  'Deporte',
  'Comunicación/Marketing',
  'Otro'
]

const selectedAreas = ref<string[]>([])
const acceptPrivacy = ref(false)
const areasError = ref(false)

async function handleSubmit() {
  areasError.value = false
  
  if (selectedAreas.value.length === 0) {
    areasError.value = true
    return
  }

  if (!acceptPrivacy.value) {
    return
  }

  const result = await submitParticipationRequest({
    ...form.value,
    areas_of_interest: selectedAreas.value,
  })

  if (result) {
    form.value = {
      full_name: '',
      email: '',
      phone: '',
      age_range: '',
      reason_for_interest: '',
      how_heard_about_us: '',
    }
    selectedAreas.value = []
    acceptPrivacy.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  resetFormState()
})
</script>
