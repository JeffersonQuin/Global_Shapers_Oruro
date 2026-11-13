// Application types

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
}

export interface Initiative {
  id: string
  title: string
  slug: string
  short_description: string
  full_description: string
  category_id?: string
  category_name?: string
  category_slug?: string
  category_color?: string
  status: 'planned' | 'active' | 'completed' | 'paused'
  start_date?: string
  end_date?: string
  featured_image_url?: string
  gallery_images?: string[]
  impact_metrics?: Record<string, any>
  is_featured: boolean
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  category_id?: string
  category_name?: string
  category_slug?: string
  category_color?: string
  start_datetime: string
  end_datetime: string
  location_type: 'physical' | 'virtual' | 'hybrid'
  location_address?: string
  virtual_link?: string
  registration_link?: string
  registration_deadline?: string
  capacity?: number
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  featured_image_url?: string
  additional_images?: string[]
  is_featured: boolean
  contact_info?: {
    name?: string
    email?: string
    phone?: string
  }
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  title: string
  slug: string
  description: string
  category_id?: string
  category_name?: string
  category_slug?: string
  category_color?: string
  opportunity_type: 'call' | 'volunteer' | 'workshop' | 'scholarship' | 'event' | 'other'
  requirements?: string
  application_process?: string
  application_link?: string
  application_deadline?: string
  time_commitment?: string
  benefits?: string
  status: 'draft' | 'open' | 'closed'
  featured_image_url?: string
  is_featured: boolean
  tags: string[]
  contact_info?: {
    name?: string
    email?: string
    phone?: string
  }
  created_at: string
  updated_at: string
}

export interface ParticipationRequest {
  full_name: string
  email: string
  phone?: string
  age_range?: string
  reason_for_interest: string
  areas_of_interest: string[]
  how_heard_about_us?: string
}

export interface CommunityProposal {
  submitter_name: string
  submitter_email: string
  submitter_phone?: string
  problem_title: string
  problem_description: string
  proposed_solution?: string
  category_id?: string
  geographic_area?: string
  priority_level?: 'low' | 'medium' | 'high' | 'urgent'
}

export interface ContactMessage {
  sender_name: string
  sender_email: string
  subject: string
  message: string
}

export interface SiteSettings {
  [key: string]: any
}
