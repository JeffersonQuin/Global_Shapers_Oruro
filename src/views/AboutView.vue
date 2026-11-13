<template>
  <div class="about-view">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
          Conoce el Hub Oruro
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl">
          Somos parte de una red global de jóvenes líderes comprometidos con generar un impacto positivo en nuestras comunidades
        </p>
      </div>
    </section>

    <!-- What is Global Shapers -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué es Global Shapers Community?
            </h2>
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                Global Shapers Community es una red del <strong>Foro Económico Mundial</strong> conformada por jóvenes líderes menores de 30 años que trabajan juntos para crear un impacto positivo en sus comunidades locales.
              </p>
              <p>
                Con más de 10,000 shapers en más de 400 hubs alrededor del mundo, somos una comunidad diversa y multicultural que comparte valores comunes de liderazgo, servicio e innovación.
              </p>
              <p>
                Cada hub opera de manera independiente pero está conectado globalmente, permitiéndonos aprender unos de otros y colaborar en iniciativas de impacto regional e internacional.
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Global Shapers Community"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hub Oruro Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
                alt="Hub Oruro"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Sobre el Hub Oruro
            </h2>
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                El <strong>Hub Oruro</strong> fue fundado con la visión de reunir a jóvenes líderes de nuestra región que están comprometidos con el desarrollo sostenible y el bienestar de nuestra comunidad.
              </p>
              <p>
                Trabajamos en proyectos e iniciativas que abordan los desafíos más urgentes de Oruro, desde educación y medio ambiente hasta innovación tecnológica y desarrollo económico.
              </p>
              <p>
                Nuestra fortaleza radica en la diversidad de nuestros miembros: emprendedores, profesionales, activistas y estudiantes que aportan diferentes perspectivas y habilidades para crear soluciones innovadoras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission and Vision -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Mission -->
          <div class="bg-primary-50 rounded-2xl p-8 border-2 border-primary-200">
            <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
            <p class="text-gray-700 leading-relaxed">
              {{ mission || 'Empoderar a jóvenes líderes de Oruro para que generen un impacto positivo y sostenible en nuestra comunidad a través de proyectos innovadores, colaboración activa y el desarrollo de capacidades que transformen nuestra región.' }}
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-secondary-50 rounded-2xl p-8 border-2 border-secondary-200">
            <div class="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
            <p class="text-gray-700 leading-relaxed">
              {{ vision || 'Ser reconocidos como la principal red de jóvenes líderes en Oruro, impulsando un cambio positivo y sostenible que inspire a futuras generaciones a contribuir activamente al desarrollo de nuestra ciudad y país.' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Areas -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Áreas de Trabajo
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestras iniciativas abarcan diversos sectores clave para el desarrollo de Oruro
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="area in workAreas"
            :key="area.title"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <component :is="area.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ area.title }}</h3>
            <p class="text-gray-600">{{ area.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Valores
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Los principios que guían nuestro trabajo y compromiso con la comunidad
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">{{ value.emoji }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">
          ¿Quieres ser parte del cambio?
        </h2>
        <p class="text-xl text-primary-100 mb-8">
          Únete a nuestra comunidad de jóvenes líderes y contribuye al desarrollo de Oruro
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton to="/participa" variant="secondary" size="lg">
            Únete al Hub
          </BaseButton>
          <BaseButton to="/iniciativas" variant="outline" size="lg" class="!text-white !border-white hover:!bg-white/10">
            Ver Nuestros Proyectos
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSiteSettings } from '@/composables/useSiteSettings'
import BaseButton from '@/components/ui/BaseButton.vue'
import {
  AcademicCapIcon,
  GlobeAltIcon,
  HeartIcon,
  LightBulbIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'

const { settings, fetchSettings, getLocalizedSetting } = useSiteSettings()

const mission = computed(() => 
  getLocalizedSetting('mission_statement', 'es')
)

const vision = computed(() => 
  getLocalizedSetting('vision_statement', 'es')
)

const workAreas = [
  {
    title: 'Educación',
    description: 'Promovemos el acceso a educación de calidad y el desarrollo de habilidades para el futuro.',
    icon: AcademicCapIcon,
  },
  {
    title: 'Medio Ambiente',
    description: 'Trabajamos por la sostenibilidad y la conservación de nuestros recursos naturales.',
    icon: GlobeAltIcon,
  },
  {
    title: 'Salud Comunitaria',
    description: 'Impulsamos iniciativas que mejoran el bienestar y la salud de nuestra población.',
    icon: HeartIcon,
  },
  {
    title: 'Innovación y Tecnología',
    description: 'Fomentamos la creatividad y el uso de tecnología para resolver problemas locales.',
    icon: LightBulbIcon,
  },
  {
    title: 'Desarrollo Social',
    description: 'Creamos oportunidades para el desarrollo económico y social de nuestra comunidad.',
    icon: UserGroupIcon,
  },
  {
    title: 'Cultura y Arte',
    description: 'Preservamos y promovemos la riqueza cultural de Oruro a través del arte y la tradición.',
    icon: SparklesIcon,
  },
]

const values = [
  {
    emoji: '🤝',
    title: 'Colaboración',
    description: 'Trabajamos en equipo para multiplicar nuestro impacto',
  },
  {
    emoji: '💡',
    title: 'Innovación',
    description: 'Buscamos soluciones creativas a los desafíos',
  },
  {
    emoji: '🌱',
    title: 'Sostenibilidad',
    description: 'Pensamos en el futuro y el bienestar a largo plazo',
  },
  {
    emoji: '❤️',
    title: 'Compromiso',
    description: 'Actuamos con pasión y dedicación en cada proyecto',
  },
]

onMounted(async () => {
  await fetchSettings()
})
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>
