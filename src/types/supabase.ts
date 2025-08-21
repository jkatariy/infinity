export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          content: string | null
          created_at: string
          current_attendees: number | null
          description: string
          end_date: string | null
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_virtual: boolean | null
          location: string | null
          max_attendees: number | null
          organizer_id: string | null
          registration_deadline: string | null
          registration_required: boolean | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          virtual_link: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          current_attendees?: number | null
          description: string
          end_date?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer_id?: string | null
          registration_deadline?: string | null
          registration_required?: boolean | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          virtual_link?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          current_attendees?: number | null
          description?: string
          end_date?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer_id?: string | null
          registration_deadline?: string | null
          registration_required?: boolean | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          virtual_link?: string | null
        }
        Relationships: []
      }
      product_types: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
      }
      packaging_types: {
        Row: {
          created_at: string | null
          description: string | null
          features: string[] | null
          id: string
          name: string
          product_type_id: string | null
          suitable_for: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          name: string
          product_type_id?: string | null
          suitable_for?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          name?: string
          product_type_id?: string | null
          suitable_for?: string[] | null
          updated_at?: string | null
        }
      }
      machines: {
        Row: {
          certifications: string[] | null
          created_at: string | null
          description: string | null
          environmental_conditions: Json | null
          features: string[] | null
          floor_space_required: number | null
          id: string
          max_product_height: number | null
          max_product_length: number | null
          max_product_weight: number | null
          max_product_width: number | null
          max_speed: number | null
          min_product_height: number | null
          min_product_length: number | null
          min_product_weight: number | null
          min_product_width: number | null
          min_speed: number | null
          model: string
          name: string
          price_range_max: number | null
          price_range_min: number | null
          updated_at: string | null
          utility_requirements: Json | null
        }
        Insert: {
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          environmental_conditions?: Json | null
          features?: string[] | null
          floor_space_required?: number | null
          id?: string
          max_product_height?: number | null
          max_product_length?: number | null
          max_product_weight?: number | null
          max_product_width?: number | null
          max_speed?: number | null
          min_product_height?: number | null
          min_product_length?: number | null
          min_product_weight?: number | null
          min_product_width?: number | null
          min_speed?: number | null
          model: string
          name: string
          price_range_max?: number | null
          price_range_min?: number | null
          updated_at?: string | null
          utility_requirements?: Json | null
        }
        Update: {
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          environmental_conditions?: Json | null
          features?: string[] | null
          floor_space_required?: number | null
          id?: string
          max_product_height?: number | null
          max_product_length?: number | null
          max_product_weight?: number | null
          max_product_width?: number | null
          max_speed?: number | null
          min_product_height?: number | null
          min_product_length?: number | null
          min_product_weight?: number | null
          min_product_width?: number | null
          min_speed?: number | null
          model?: string
          name?: string
          price_range_max?: number | null
          price_range_min?: number | null
          updated_at?: string | null
          utility_requirements?: Json | null
        }
      }
      machine_packaging_types: {
        Row: {
          machine_id: string
          packaging_type_id: string
        }
        Insert: {
          machine_id: string
          packaging_type_id: string
        }
        Update: {
          machine_id?: string
          packaging_type_id?: string
        }
      }
      saved_selections: {
        Row: {
          created_at: string | null
          id: string
          packaging_type_id: string | null
          product_type_id: string | null
          recommendations: Json | null
          requirements: Json | null
          specifications: Json | null
          stage: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          packaging_type_id?: string | null
          product_type_id?: string | null
          recommendations?: Json | null
          requirements?: Json | null
          specifications?: Json | null
          stage: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          packaging_type_id?: string | null
          product_type_id?: string | null
          recommendations?: Json | null
          requirements?: Json | null
          specifications?: Json | null
          stage?: number
          updated_at?: string | null
          user_id?: string | null
        }
      }
      ticker_messages: {
        Row: {
          position: number
          text: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          position: number
          text: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          position?: number
          text?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
  }
}

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export type Event = Database['public']['Tables']['events']['Row']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type EventUpdate = Database['public']['Tables']['events']['Update']

export type ProductType = Database['public']['Tables']['product_types']['Row']
export type PackagingType = Database['public']['Tables']['packaging_types']['Row']
export type Machine = Database['public']['Tables']['machines']['Row']
export type MachinePackagingType = Database['public']['Tables']['machine_packaging_types']['Row']
export type SavedSelection = Database['public']['Tables']['saved_selections']['Row']
export type TickerMessage = Database['public']['Tables']['ticker_messages']['Row']
export type TickerMessageInsert = Database['public']['Tables']['ticker_messages']['Insert']
export type TickerMessageUpdate = Database['public']['Tables']['ticker_messages']['Update'] 