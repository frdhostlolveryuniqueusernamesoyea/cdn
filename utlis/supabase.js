import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbfzldvhywdhaucfvmli.supabase.co' // nahraď svým
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZnpsZHZoeXdkaGF1Y2Z2bWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjYxMjgsImV4cCI6MjA1OTUwMjEyOH0.-e3APvuwJxyqEwXAJgNxTz6AiBGcZXEs7AsGDYliDxs'         // nahraď svým

export const supabase = createClient(supabaseUrl, supabaseKey)
