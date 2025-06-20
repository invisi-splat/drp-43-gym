export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      chats: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          description: string | null
          id: number
          name: string
          regimen: number
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
          regimen: number
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
          regimen?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercises_regimen_fkey"
            columns: ["regimen"]
            isOneToOne: false
            referencedRelation: "regimens"
            referencedColumns: ["id"]
          },
        ]
      }
      gyms: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          chat_id: number
          id: number
          user_id: number
        }
        Insert: {
          body: string
          chat_id: number
          id?: number
          user_id: number
        }
        Update: {
          body?: string
          chat_id?: number
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      regimens: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          age: number
          id: number
          main_gym_id: number | null
          name: string
          sex: string
          skill: Database["public"]["Enums"]["skill"] | null
        }
        Insert: {
          age: number
          id?: number
          main_gym_id?: number | null
          name: string
          sex: string
          skill?: Database["public"]["Enums"]["skill"] | null
        }
        Update: {
          age?: number
          id?: number
          main_gym_id?: number | null
          name?: string
          sex?: string
          skill?: Database["public"]["Enums"]["skill"] | null
        }
        Relationships: []
      }
      users_chats: {
        Row: {
          chat_id: number
          user_id: number
        }
        Insert: {
          chat_id: number
          user_id: number
        }
        Update: {
          chat_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_chats_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_chats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          dateTime: string
          desc: string | null
          gym: number
          id: number
          isFriend: boolean
          regimen_id: number
          user_id: number
        }
        Insert: {
          dateTime: string
          desc?: string | null
          gym: number
          id?: number
          isFriend: boolean
          regimen_id: number
          user_id: number
        }
        Update: {
          dateTime?: string
          desc?: string | null
          gym?: number
          id?: number
          isFriend?: boolean
          regimen_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workouts_gym_fkey"
            columns: ["gym"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_regimen_id_fkey"
            columns: ["regimen_id"]
            isOneToOne: false
            referencedRelation: "regimens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_chat_containing_user: {
        Args: { user1: number }
        Returns: {
          user_id: number
          name: string
          chat_id: number
        }[]
      }
      get_private_chat: {
        Args: { user1: number; user2: number }
        Returns: {
          chat_id: number
        }[]
      }
    }
    Enums: {
      regimen:
        | "arms"
        | "legs"
        | "chest"
        | "back"
        | "shoulders"
        | "core"
        | "full body"
        | "upper body"
        | "lower body"
        | "cardio"
        | "hiit"
        | "glutes"
        | "abs"
        | "calisthenics"
        | "strength training"
        | "endurance"
        | "mobility"
        | "flexibility"
        | "powerlifting"
        | "olympic lifting"
      skill: "novice" | "intermediate" | "experienced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      regimen: [
        "arms",
        "legs",
        "chest",
        "back",
        "shoulders",
        "core",
        "full body",
        "upper body",
        "lower body",
        "cardio",
        "hiit",
        "glutes",
        "abs",
        "calisthenics",
        "strength training",
        "endurance",
        "mobility",
        "flexibility",
        "powerlifting",
        "olympic lifting",
      ],
      skill: ["novice", "intermediate", "experienced"],
    },
  },
} as const
