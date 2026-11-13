import { ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Event, Category } from '@/types'

export function useEvents() {
  const events: Ref<Event[]> = ref([])
  const event: Ref<Event | null> = ref(null)
  const categories: Ref<Category[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch all published events with category info
  async function fetchEvents(filters?: {
    categoryId?: string
    locationType?: string
    isFeatured?: boolean
    upcoming?: boolean
    search?: string
  }) {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('v_published_events')
        .select('*')
        .order('start_datetime', { ascending: true })

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId)
      }

      if (filters?.locationType) {
        query = query.eq('location_type', filters.locationType)
      }

      if (filters?.isFeatured) {
        query = query.eq('is_featured', true)
      }

      if (filters?.upcoming) {
        query = query.gte('start_datetime', new Date().toISOString())
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        )
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      events.value = (data || []) as Event[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar eventos'
      console.error('Error fetching events:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch single event by slug
  async function fetchEventBySlug(slug: string) {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('v_published_events')
        .select('*')
        .eq('slug', slug)
        .single()

      if (fetchError) throw fetchError

      event.value = data as Event
    } catch (e: any) {
      error.value = e.message || 'Error al cargar el evento'
      console.error('Error fetching event:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch event categories
  async function fetchCategories() {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('event_categories')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (fetchError) throw fetchError

      categories.value = (data || []) as Category[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar categorías'
      console.error('Error fetching categories:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch upcoming events for homepage
  async function fetchUpcomingEvents(limit: number = 5) {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('v_published_events')
        .select('*')
        .gte('start_datetime', new Date().toISOString())
        .order('start_datetime', { ascending: true })
        .limit(limit)

      if (fetchError) throw fetchError

      events.value = (data || []) as Event[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar eventos próximos'
      console.error('Error fetching upcoming events:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch featured events
  async function fetchFeaturedEvents(limit: number = 3) {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('v_published_events')
        .select('*')
        .eq('is_featured', true)
        .gte('start_datetime', new Date().toISOString())
        .order('start_datetime', { ascending: true })
        .limit(limit)

      if (fetchError) throw fetchError

      events.value = (data || []) as Event[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar eventos destacados'
      console.error('Error fetching featured events:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    events,
    event,
    categories,
    loading,
    error,
    fetchEvents,
    fetchEventBySlug,
    fetchCategories,
    fetchUpcomingEvents,
    fetchFeaturedEvents,
  }
}
