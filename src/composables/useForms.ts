import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { ParticipationRequest, CommunityProposal, ContactMessage } from '@/types'

export function useForms() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  // Submit participation request
  async function submitParticipationRequest(data: ParticipationRequest) {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const { error: submitError } = await supabase
        .from('participation_requests')
        .insert([
          {
            full_name: data.full_name,
            email: data.email,
            phone: data.phone || null,
            age_range: data.age_range || null,
            reason_for_interest: data.reason_for_interest,
            areas_of_interest: data.areas_of_interest,
            how_heard_about_us: data.how_heard_about_us || null,
            user_agent: navigator.userAgent,
          },
        ])

      if (submitError) throw submitError

      success.value = true
      return true
    } catch (e: any) {
      error.value = e.message || 'Error al enviar la solicitud'
      console.error('Error submitting participation request:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  // Submit community proposal
  async function submitCommunityProposal(data: CommunityProposal) {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const { error: submitError } = await supabase
        .from('community_proposals')
        .insert([
          {
            submitter_name: data.submitter_name,
            submitter_email: data.submitter_email,
            submitter_phone: data.submitter_phone ?? null,
            problem_title: data.problem_title,
            problem_description: data.problem_description,
            proposed_solution: data.proposed_solution ?? null,
            category_id: data.category_id ?? null,
            geographic_area: data.geographic_area ?? null,
            priority_level: data.priority_level ?? null,
            ip_address: null,
            user_agent: navigator.userAgent,
          },
        ])

      if (submitError) throw submitError

      success.value = true
      return true
    } catch (e: any) {
      error.value = e.message || 'Error al enviar la propuesta'
      console.error('Error submitting community proposal:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  // Submit contact message
  async function submitContactMessage(data: ContactMessage) {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([
          {
            sender_name: data.sender_name,
            sender_email: data.sender_email,
            subject: data.subject,
            message: data.message,
            ip_address: null,
            user_agent: navigator.userAgent,
          },
        ])

      if (submitError) throw submitError

      success.value = true
      return true
    } catch (e: any) {
      error.value = e.message || 'Error al enviar el mensaje'
      console.error('Error submitting contact message:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  // Fetch proposal categories
  async function fetchProposalCategories() {
    try {
      const { data, error: fetchError } = await supabase
        .from('proposal_categories')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (fetchError) throw fetchError

      return data || []
    } catch (e: any) {
      console.error('Error fetching proposal categories:', e)
      return []
    }
  }

  // Reset form state
  function resetFormState() {
    loading.value = false
    error.value = null
    success.value = false
  }

  return {
    loading,
    error,
    success,
    submitParticipationRequest,
    submitCommunityProposal,
    submitContactMessage,
    fetchProposalCategories,
    resetFormState,
  }
}
