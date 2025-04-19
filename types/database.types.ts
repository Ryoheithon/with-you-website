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
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
