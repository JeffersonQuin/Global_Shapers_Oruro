import { ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Initiative, Category } from '@/types'

export function useInitiatives() {
  const initiatives: Ref<Initiative[]> = ref([])
  const initiative: Ref<Initiative | null> = ref(null)
  const categories: Ref<Category[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch all published initiatives with category info
  async function fetchInitiatives(filters?: {
    categoryId?: string
    status?: string
    isFeatured?: boolean
    search?: string
  }) {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('v_active_initiatives')
        .select('*')
        .order('created_at', { ascending: false })

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId)
      }

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.isFeatured) {
        query = query.eq('is_featured', true)
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`
        )
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      initiatives.value = (data || []) as Initiative[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar iniciativas'
      console.error('Error fetching initiatives:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch single initiative by slug
  async function fetchInitiativeBySlug(slug: string) {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('v_active_initiatives')
        .select('*')
        .eq('slug', slug)
        .single()

      if (fetchError) throw fetchError

      initiative.value = data as Initiative

      // Increment view count
      if (data?.id) {
        await supabase
          .from('initiatives')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', data.id)
      }
    } catch (e: any) {
      error.value = e.message || 'Error al cargar la iniciativa'
      console.error('Error fetching initiative:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch initiative categories
  async function fetchCategories() {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('initiative_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (fetchError) throw fetchError

      categories.value = (data || []) as Category[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar categorías'
      console.error('Error fetching categories:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch featured initiatives for homepage
  async function fetchFeaturedInitiatives(limit: number = 3) {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('v_active_initiatives')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (fetchError) throw fetchError

      initiatives.value = (data || []) as Initiative[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar iniciativas destacadas'
      console.error('Error fetching featured initiatives:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    initiatives,
    initiative,
    categories,
    loading,
    error,
    fetchInitiatives,
    fetchInitiativeBySlug,
    fetchCategories,
    fetchFeaturedInitiatives,
  }
}
