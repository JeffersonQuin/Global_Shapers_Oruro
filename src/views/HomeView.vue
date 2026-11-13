<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {{ heroTitle }}
          </h1>
          <p class="text-xl sm:text-2xl mb-8 text-primary-100">
            {{ heroSubtitle }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <BaseButton size="lg" variant="secondary" to="/participa">
              Únete a Nosotros
            </BaseButton>
            <BaseButton size="lg" variant="outline" to="/conoce-el-hub" class="!text-white !border-white hover:!bg-white/10">
              Conoce Más
            </BaseButton>
          </div>
        </div>
      </div>
      
      <!-- Decorative wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </section>

    <!-- Featured Initiatives Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestras Iniciativas
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Proyectos que están generando un impacto positivo en nuestra comunidad
          </p>
        </div>

        <LoadingSpinner v-if="initiativesLoading" center text="Cargando iniciativas..." />
        <ErrorMessage v-else-if="initiativesError" :message="initiativesError" variant="error" />
        
        <div v-else-if="featuredInitiatives.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InitiativeCard
            v-for="initiative in featuredInitiatives"
            :key="initiative.id"
            :initiative="initiative"
          />
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          No hay iniciativas destacadas en este momento.
        </div>

        <div class="text-center mt-12">
          <BaseButton to="/iniciativas" variant="outline" size="lg">
            Ver Todas las Iniciativas
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Upcoming Events Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Próximos Eventos
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Participa en nuestras actividades y conecta con otros jóvenes
          </p>
        </div>

        <LoadingSpinner v-if="eventsLoading" center text="Cargando eventos..." />
        <ErrorMessage v-else-if="eventsError" :message="eventsError" variant="error" />
        
        <div v-else-if="upcomingEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard
            v-for="event in upcomingEvents"
            :key="event.id"
            :event="event"
          />
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          No hay eventos próximos programados en este momento.
        </div>

        <div class="text-center mt-12">
          <BaseButton to="/eventos" variant="outline" size="lg">
            Ver Todos los Eventos
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Opportunities Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Oportunidades para Jóvenes
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre convocatorias, voluntariados y más oportunidades de desarrollo
          </p>
        </div>

        <LoadingSpinner v-if="opportunitiesLoading" center text="Cargando oportunidades..." />
        <ErrorMessage v-else-if="opportunitiesError" :message="opportunitiesError" variant="error" />
        
        <div v-else-if="featuredOpportunities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <OpportunityCard
            v-for="opportunity in featuredOpportunities"
            :key="opportunity.id"
            :opportunity="opportunity"
          />
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          No hay oportunidades destacadas en este momento.
        </div>

        <div class="text-center mt-12">
          <BaseButton to="/oportunidades" variant="outline" size="lg">
            Ver Todas las Oportunidades
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          ¿Listo para hacer la diferencia?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Únete a nuestra comunidad de jóvenes líderes y contribuye al desarrollo de Oruro
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton to="/participa" variant="secondary" size="lg">
            Participa con Nosotros
          </BaseButton>
          <BaseButton to="/proponer-idea" variant="outline" size="lg" class="!text-white !border-white hover:!bg-white/10">
            Propón una Idea
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Impact Stats Section (Optional - can be populated later) -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div class="text-gray-600">Miembros Activos</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">30+</div>
            <div class="text-gray-600">Proyectos Realizados</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">100+</div>
            <div class="text-gray-600">Eventos Organizados</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary-600 mb-2">5K+</div>
            <div class="text-gray-600">Personas Impactadas</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useInitiatives } from '@/composables/useInitiatives'
import { useEvents } from '@/composables/useEvents'
import { useOpportunities } from '@/composables/useOpportunities'
import { useSiteSettings } from '@/composables/useSiteSettings'
import BaseButton from '@/components/ui/BaseButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import InitiativeCard from '@/components/cards/InitiativeCard.vue'
import EventCard from '@/components/cards/EventCard.vue'
import OpportunityCard from '@/components/cards/OpportunityCard.vue'

// Composables
const {
  initiatives: featuredInitiatives,
  loading: initiativesLoading,
  error: initiativesError,
  fetchFeaturedInitiatives,
} = useInitiatives()

const {
  events: upcomingEvents,
  loading: eventsLoading,
  error: eventsError,
  fetchUpcomingEvents,
} = useEvents()

const {
  opportunities: featuredOpportunities,
  loading: opportunitiesLoading,
  error: opportunitiesError,
  fetchFeaturedOpportunities,
} = useOpportunities()

const {
  settings,
  fetchSettings,
  getLocalizedSetting,
} = useSiteSettings()

// Computed properties for hero content
const heroTitle = computed(() => 
  getLocalizedSetting('hero_title', 'es', 'Bienvenido a Global Shapers Hub Oruro')
)

const heroSubtitle = computed(() => 
  getLocalizedSetting('hero_subtitle', 'es', 'Somos una comunidad de jóvenes comprometidos con el desarrollo de Oruro')
)

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    fetchSettings(),
    fetchFeaturedInitiatives(3),
    fetchUpcomingEvents(3),
    fetchFeaturedOpportunities(3),
  ])
})
</script>
