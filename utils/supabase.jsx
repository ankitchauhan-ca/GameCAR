import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://svmkvadslurjjigobbor.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bWt2YWRzbHVyamppZ29iYm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MjM0NjYsImV4cCI6MjA0MDk5OTQ2Nn0.Tw1jtFmbX5K2klSVW-tWlWcNY5PH8QVm8WCCkWbPhKc";
const supabase = createClient(supabaseUrl, supabaseKey);
