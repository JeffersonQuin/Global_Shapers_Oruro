// Database types matching the Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json | null
          description: string | null
          category: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json | null
          description?: string | null
          category?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json | null
          description?: string | null
          category?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      initiative_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      initiatives: {
        Row: {
          id: string
          title: string
          slug: string
          short_description: string
          full_description: string
          category_id: string | null
          status: 'planned' | 'active' | 'completed' | 'paused'
          start_date: string | null
          end_date: string | null
          featured_image_url: string | null
          gallery_images: Json
          impact_metrics: Json
          is_featured: boolean
          is_published: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          short_description: string
          full_description: string
          category_id?: string | null
          status?: 'planned' | 'active' | 'completed' | 'paused'
          start_date?: string | null
          end_date?: string | null
          featured_image_url?: string | null
          gallery_images?: Json
          impact_metrics?: Json
          is_featured?: boolean
          is_published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          short_description?: string
          full_description?: string
          category_id?: string | null
          status?: 'planned' | 'active' | 'completed' | 'paused'
          start_date?: string | null
          end_date?: string | null
          featured_image_url?: string | null
          gallery_images?: Json
          impact_metrics?: Json
          is_featured?: boolean
          is_published?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      event_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          icon: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          icon?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          category_id: string | null
          start_datetime: string
          end_datetime: string
          location_type: 'physical' | 'virtual' | 'hybrid'
          location_address: string | null
          location_coordinates: unknown | null
          virtual_link: string | null
          registration_link: string | null
          registration_deadline: string | null
          capacity: number | null
          status: 'draft' | 'published' | 'cancelled' | 'completed'
          featured_image_url: string | null
          additional_images: Json
          is_featured: boolean
          contact_info: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          category_id?: string | null
          start_datetime: string
          end_datetime: string
          location_type?: 'physical' | 'virtual' | 'hybrid'
          location_address?: string | null
          location_coordinates?: unknown | null
          virtual_link?: string | null
          registration_link?: string | null
          registration_deadline?: string | null
          capacity?: number | null
          status?: 'draft' | 'published' | 'cancelled' | 'completed'
          featured_image_url?: string | null
          additional_images?: Json
          is_featured?: boolean
          contact_info?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          category_id?: string | null
          start_datetime?: string
          end_datetime?: string
          location_type?: 'physical' | 'virtual' | 'hybrid'
          location_address?: string | null
          location_coordinates?: unknown | null
          virtual_link?: string | null
          registration_link?: string | null
          registration_deadline?: string | null
          capacity?: number | null
          status?: 'draft' | 'published' | 'cancelled' | 'completed'
          featured_image_url?: string | null
          additional_images?: Json
          is_featured?: boolean
          contact_info?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      opportunity_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          category_id: string | null
          opportunity_type: 'call' | 'volunteer' | 'workshop' | 'scholarship' | 'event' | 'other'
          requirements: string | null
          application_process: string | null
          application_link: string | null
          application_deadline: string | null
          time_commitment: string | null
          benefits: string | null
          status: 'draft' | 'open' | 'closed'
          featured_image_url: string | null
          is_featured: boolean
          tags: string[]
          contact_info: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          category_id?: string | null
          opportunity_type: 'call' | 'volunteer' | 'workshop' | 'scholarship' | 'event' | 'other'
          requirements?: string | null
          application_process?: string | null
          application_link?: string | null
          application_deadline?: string | null
          time_commitment?: string | null
          benefits?: string | null
          status?: 'draft' | 'open' | 'closed'
          featured_image_url?: string | null
          is_featured?: boolean
          tags?: string[]
          contact_info?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          category_id?: string | null
          opportunity_type?: 'call' | 'volunteer' | 'workshop' | 'scholarship' | 'event' | 'other'
          requirements?: string | null
          application_process?: string | null
          application_link?: string | null
          application_deadline?: string | null
          time_commitment?: string | null
          benefits?: string | null
          status?: 'draft' | 'open' | 'closed'
          featured_image_url?: string | null
          is_featured?: boolean
          tags?: string[]
          contact_info?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      participation_requests: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          age_range: string | null
          reason_for_interest: string
          areas_of_interest: string[]
          how_heard_about_us: string | null
          status: 'pending' | 'contacted' | 'accepted' | 'declined' | 'archived'
          admin_notes: string | null
          ip_address: string | null
          user_agent: string | null
          submitted_at: string
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone?: string | null
          age_range?: string | null
          reason_for_interest: string
          areas_of_interest: string[]
          how_heard_about_us?: string | null
          status?: 'pending' | 'contacted' | 'accepted' | 'declined' | 'archived'
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          age_range?: string | null
          reason_for_interest?: string
          areas_of_interest?: string[]
          how_heard_about_us?: string | null
          status?: 'pending' | 'contacted' | 'accepted' | 'declined' | 'archived'
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      proposal_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      community_proposals: {
        Row: {
          id: string
          submitter_name: string
          submitter_email: string
          submitter_phone: string | null
          problem_title: string
          problem_description: string
          proposed_solution: string | null
          category_id: string | null
          geographic_area: string | null
          priority_level: 'low' | 'medium' | 'high' | 'urgent' | null
          supporting_files: Json
          status: 'submitted' | 'under_review' | 'accepted' | 'declined' | 'implemented'
          admin_notes: string | null
          ip_address: string | null
          user_agent: string | null
          submitted_at: string
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          submitter_name: string
          submitter_email: string
          submitter_phone?: string | null
          problem_title: string
          problem_description: string
          proposed_solution?: string | null
          category_id?: string | null
          geographic_area?: string | null
          priority_level?: 'low' | 'medium' | 'high' | 'urgent' | null
          supporting_files?: Json
          status?: 'submitted' | 'under_review' | 'accepted' | 'declined' | 'implemented'
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          submitter_name?: string
          submitter_email?: string
          submitter_phone?: string | null
          problem_title?: string
          problem_description?: string
          proposed_solution?: string | null
          category_id?: string | null
          geographic_area?: string | null
          priority_level?: 'low' | 'medium' | 'high' | 'urgent' | null
          supporting_files?: Json
          status?: 'submitted' | 'under_review' | 'accepted' | 'declined' | 'implemented'
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      chatbot_knowledge: {
        Row: {
          id: string
          title: string
          content: string
          content_type: string | null
          category: string | null
          tags: string[]
          source_reference: string | null
          is_active: boolean
          priority: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          content_type?: string | null
          category?: string | null
          tags?: string[]
          source_reference?: string | null
          is_active?: boolean
          priority?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          content_type?: string | null
          category?: string | null
          tags?: string[]
          source_reference?: string | null
          is_active?: boolean
          priority?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          sender_name: string
          sender_email: string
          subject: string
          message: string
          status: 'unread' | 'read' | 'replied' | 'archived'
          admin_notes: string | null
          ip_address: string | null
          user_agent: string | null
          sent_at: string
          read_at: string | null
          replied_at: string | null
        }
        Insert: {
          id?: string
          sender_name: string
          sender_email: string
          subject: string
          message: string
          status?: 'unread' | 'read' | 'replied' | 'archived'
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          sent_at?: string
          read_at?: string | null
          replied_at?: string | null
        }
        Update: {
          id?: string
          sender_name?: string
          sender_email?: string
          subject?: string
          message?: string
          status?: 'unread' | 'read' | 'replied' | 'archived'
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          sent_at?: string
          read_at?: string | null
          replied_at?: string | null
        }
      }
    }
    Views: {
      v_active_initiatives: {
        Row: {
          id: string | null
          title: string | null
          slug: string | null
          short_description: string | null
          full_description: string | null
          category_id: string | null
          status: string | null
          start_date: string | null
          end_date: string | null
          featured_image_url: string | null
          gallery_images: Json | null
          impact_metrics: Json | null
          is_featured: boolean | null
          is_published: boolean | null
          view_count: number | null
          created_at: string | null
          updated_at: string | null
          category_name: string | null
          category_slug: string | null
          category_color: string | null
        }
      }
      v_published_events: {
        Row: {
          id: string | null
          title: string | null
          slug: string | null
          description: string | null
          category_id: string | null
          start_datetime: string | null
          end_datetime: string | null
          location_type: string | null
          location_address: string | null
          location_coordinates: unknown | null
          virtual_link: string | null
          registration_link: string | null
          registration_deadline: string | null
          capacity: number | null
          status: string | null
          featured_image_url: string | null
          additional_images: Json | null
          is_featured: boolean | null
          contact_info: Json | null
          created_at: string | null
          updated_at: string | null
          category_name: string | null
          category_slug: string | null
          category_color: string | null
        }
      }
      v_available_opportunities: {
        Row: {
          id: string | null
          title: string | null
          slug: string | null
          description: string | null
          category_id: string | null
          opportunity_type: string | null
          requirements: string | null
          application_process: string | null
          application_link: string | null
          application_deadline: string | null
          time_commitment: string | null
          benefits: string | null
          status: string | null
          featured_image_url: string | null
          is_featured: boolean | null
          tags: string[] | null
          contact_info: Json | null
          created_at: string | null
          updated_at: string | null
          category_name: string | null
          category_slug: string | null
          category_color: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
