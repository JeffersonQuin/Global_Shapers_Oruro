import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Inicio - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/conoce-el-hub',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'Conoce el Hub - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/iniciativas',
    name: 'initiatives',
    component: () => import('@/views/initiatives/InitiativesView.vue'),
    meta: {
      title: 'Iniciativas y Proyectos - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/iniciativas/:slug',
    name: 'initiative-detail',
    component: () => import('@/views/initiatives/InitiativeDetailView.vue'),
    meta: {
      title: 'Iniciativa - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/eventos',
    name: 'events',
    component: () => import('@/views/events/EventsView.vue'),
    meta: {
      title: 'Eventos y Actividades - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/eventos/:slug',
    name: 'event-detail',
    component: () => import('@/views/events/EventDetailView.vue'),
    meta: {
      title: 'Evento - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/oportunidades',
    name: 'opportunities',
    component: () => import('@/views/opportunities/OpportunitiesView.vue'),
    meta: {
      title: 'Oportunidades para Jóvenes - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/oportunidades/:slug',
    name: 'opportunity-detail',
    component: () => import('@/views/opportunities/OpportunityDetailView.vue'),
    meta: {
      title: 'Oportunidad - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/participa',
    name: 'participate',
    component: () => import('@/views/ParticipateView.vue'),
    meta: {
      title: 'Participa con Nosotros - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/proponer-idea',
    name: 'propose-idea',
    component: () => import('@/views/ProposeIdeaView.vue'),
    meta: {
      title: 'Propón una Idea - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: {
      title: 'Contacto - Global Shapers Hub Oruro',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Página no encontrada - Global Shapers Hub Oruro',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Update document title on route change
router.afterEach((to) => {
  const title = to.meta.title as string
  if (title) {
    document.title = title
  }
})

export default router
