<template>
  <div class="propose-idea-view">
    <section class="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold mb-4">Propón una Idea</h1>
        <p class="text-xl text-secondary-100">
          Comparte tu visión para mejorar nuestra comunidad. Todas las ideas son bienvenidas.
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
              <h3 class="text-lg font-bold text-green-900 mb-2">¡Propuesta enviada con éxito!</h3>
              <p class="text-green-700">Gracias por compartir tu idea. Nuestro equipo la revisará pronto.</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Tu nombre <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.submitter_name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.submitter_email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono (opcional)</label>
              <input
                v-model="form.submitter_phone"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Título del problema <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.problem_title"
                type="text"
                required
                placeholder="Ej: Falta de espacios recreativos para jóvenes"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descripción del problema <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="form.problem_description"
                rows="5"
                required
                placeholder="Describe el problema que identificaste en tu comunidad..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Solución propuesta (opcional)</label>
              <textarea
                v-model="form.proposed_solution"
                rows="5"
                placeholder="¿Tienes una idea de cómo resolver este problema?"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Categoría <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.category_id"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">Selecciona una categoría</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nivel de prioridad (opcional)</label>
                <select
                  v-model="form.priority_level"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  <option value="">Selecciona...</option>
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Área geográfica (opcional)</label>
              <input
                v-model="form.geographic_area"
                type="text"
                placeholder="Ej: Barrio Norte, Zona Central, etc."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
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
                class="mt-1 h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300 rounded"
              />
              <label class="ml-2 text-sm text-gray-700">
                Acepto la política de privacidad y el uso de mis datos <span class="text-red-500">*</span>
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full px-6 py-3 bg-secondary-600 text-white font-medium rounded-lg hover:bg-secondary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
              <span v-else>Enviar Propuesta</span>
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

const { loading, error, success, submitCommunityProposal, fetchProposalCategories, resetFormState } = useForms()
const categories = ref<any[]>([])

const form = ref({
  submitter_name: '',
  submitter_email: '',
  submitter_phone: '',
  problem_title: '',
  problem_description: '',
  proposed_solution: '',
  category_id: '',
  geographic_area: '',
  priority_level: '',
})

const acceptPrivacy = ref(false)

async function handleSubmit() {
  if (!acceptPrivacy.value) {
    return
  }

  const result = await submitCommunityProposal({
    ...form.value,
    category_id: form.value.category_id || undefined,
    priority_level: (form.value.priority_level as any) || undefined,
  })

  if (result) {
    form.value = {
      submitter_name: '',
      submitter_email: '',
      submitter_phone: '',
      problem_title: '',
      problem_description: '',
      proposed_solution: '',
      category_id: '',
      geographic_area: '',
      priority_level: '',
    }
    acceptPrivacy.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(async () => {
  resetFormState()
  categories.value = await fetchProposalCategories()
})
</script>
