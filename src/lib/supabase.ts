import { createClient } from '@supabase/supabase-js'
import { DATABASE_ANON_KEY, DATABASE_URL } from '$env/static/private';

export const supabase = createClient(DATABASE_URL, DATABASE_ANON_KEY)