import { ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Opportunity, Category } from '@/types'

export function useOpportunities() {
  const opportunities: Ref<Opportunity[]> = ref([])
  const opportunity: Ref<Opportunity | null> = ref(null)
  const categories: Ref<Category[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch all available opportunities with category info
  async function fetchOpportunities(filters?: {
    categoryId?: string
    opportunityType?: string
    status?: string
    isFeatured?: boolean
    tags?: string[]
    search?: string
  }) {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('v_available_opportunities')
        .select('*')
        .order('application_deadline', { ascending: true, nullsFirst: false })

      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId)
      }

      if (filters?.opportunityType) {
        query = query.eq('opportunity_type', filters.opportunityType)
      }

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.isFeatured) {
        query = query.eq('is_featured', true)
      }

      if (filters?.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags)
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        )
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      opportunities.value = (data || []) as Opportunity[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar oportunidades'
      console.error('Error fetching opportunities:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch single opportunity by slug
  async function fetchOpportunityBySlug(slug: string) {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('v_available_opportunities')
        .select('*')
        .eq('slug', slug)
        .single()

      if (fetchError) throw fetchError

      opportunity.value = data as Opportunity
    } catch (e: any) {
      error.value = e.message || 'Error al cargar la oportunidad'
      console.error('Error fetching opportunity:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch opportunity categories
  async function fetchCategories() {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('opportunity_categories')
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

  // Fetch featured opportunities for homepage
  async function fetchFeaturedOpportunities(limit: number = 3) {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('v_available_opportunities')
        .select('*')
        .eq('is_featured', true)
        .eq('status', 'open')
        .order('application_deadline', { ascending: true, nullsFirst: false })
        .limit(limit)

      if (fetchError) throw fetchError

      opportunities.value = (data || []) as Opportunity[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar oportunidades destacadas'
      console.error('Error fetching featured opportunities:', e)
    } finally {
      loading.value = false
    }
  }

  // Fetch open opportunities (active applications)
  async function fetchOpenOpportunities(limit?: number) {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('v_available_opportunities')
        .select('*')
        .eq('status', 'open')
        .order('application_deadline', { ascending: true, nullsFirst: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      opportunities.value = (data || []) as Opportunity[]
    } catch (e: any) {
      error.value = e.message || 'Error al cargar oportunidades abiertas'
      console.error('Error fetching open opportunities:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    opportunities,
    opportunity,
    categories,
    loading,
    error,
    fetchOpportunities,
    fetchOpportunityBySlug,
    fetchCategories,
    fetchFeaturedOpportunities,
    fetchOpenOpportunities,
  }
}
