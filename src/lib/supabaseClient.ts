import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zawtrowcfgzblxvihyiq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphd3Ryb3djZmd6Ymx4dmloeWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTEzMTksImV4cCI6MjA2MjE2NzMxOX0.n9cj0XsHF4MC3xN1J9fxGD5yU2NhsGGXTcD_WM9jX_I'

export const supabase = createClient(supabaseUrl, supabaseKey)
