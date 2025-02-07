import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://swjwzsoqbpfsivdzudfx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3and6c29xYnBmc2l2ZHp1ZGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NzA3NTUsImV4cCI6MjA1NDE0Njc1NX0.ycx7pOlJYb8LuDqYPS1TblfACrUIzP7R0J9GKovcfww";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
