import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/supabase';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_ANON_KEY;

// Database provides the types for our DB schema.
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
