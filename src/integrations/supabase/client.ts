// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uglfylczmjkjhusdpnaz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnbGZ5bGN6bWpramh1c2RwbmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mjc3MjcsImV4cCI6MjA2NTUwMzcyN30.mgx2o1asxRLSqiB-ajhQBl3YGtA9ngWTVhiif48zp6I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);