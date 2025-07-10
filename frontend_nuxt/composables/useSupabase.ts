import { createClient } from '@supabase/supabase-js'

/**
 * PUBLIC_INTERFACE
 * useSupabase composable to interact with Supabase and provide CRUD operations for notes.
 *
 * Ensures only a single Supabase client instance.
 * The notes table must have fields: id (PK), title (string), content (string), created_at (timestamp).
 */
const SUPABASE_URL = 'https://mzxyorlnbfdkneiezgjz.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eHlvcmxuYmZka25laWV6Z2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDUxMDksImV4cCI6MjA2NzYyMTEwOX0.URYpbwtC2u5ORBlUzpWPNspXMWq_cLBOKWMOgGbilyQ'

let supabase: ReturnType<typeof createClient> | null = null

function getClient() {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  }
  return supabase
}

// PUBLIC_INTERFACE
export function useSupabase() {
  const listNotes = async () => {
    const client = getClient()
    const { data, error } = await client.from('notes').select('*').order('created_at', { ascending: false })
    return { data, error }
  }

  const upsertNote = async (note: any) => {
    const client = getClient()
    // If note has id, update; else insert new
    if (note.id) {
      const { data, error } = await client.from('notes').update({
        title: note.title,
        content: note.content,
      }).eq('id', note.id).select().single()
      return { data, error }
    } else {
      const { data, error } = await client.from('notes').insert([{
        title: note.title,
        content: note.content,
      }]).select().single()
      return { data, error }
    }
  }

  const deleteNote = async (id: number) => {
    const client = getClient()
    const { error } = await client.from('notes').delete().eq('id', id)
    return { error }
  }

  return { listNotes, upsertNote, deleteNote }
}
