<template>
  <div class="main-layout">
    <header class="header">
      <h1>Simple Notes</h1>
    </header>
    <main class="main-section">
      <NotesList 
        :notes="notes"
        @edit="openEditor"
        @delete="deleteNote"
        :loading="loading"
      />
      <button class="add-btn" @click="openEditor()">
        +
      </button>
    </main>
    <NoteEditor 
      v-if="showEditor" 
      :note="editingNote"
      @close="closeEditor"
      @save="handleSaveNote"
      :saving="saving"
    />
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * The main application component for the Simple Notes app.
 * Integrates Supabase and handles notes CRUD logic,
 * manages main layout, and modals.
 */
import { ref, onMounted } from 'vue'
import { useSupabase } from './composables/useSupabase'
import NotesList from './components/NotesList.vue'
import NoteEditor from './components/NoteEditor.vue'

const { listNotes, upsertNote, deleteNote: deleteNoteSupabase } = useSupabase()

const notes = ref([])
const loading = ref(true)
const saving = ref(false)
const showEditor = ref(false)
const editingNote = ref(null)

const loadNotes = async () => {
  loading.value = true
  const { data, error } = await listNotes()
  if (!error) notes.value = data
  loading.value = false
}

const openEditor = (note = null) => {
  editingNote.value = note
  showEditor.value = true
}

const closeEditor = () => {
  editingNote.value = null
  showEditor.value = false
}

const handleSaveNote = async (note) => {
  saving.value = true
  const { data, error } = await upsertNote(note)
  if (!error) {
    await loadNotes()
    closeEditor()
  }
  saving.value = false
}

const deleteNote = async (id: number) => {
  if (window.confirm('Delete this note?')) {
    await deleteNoteSupabase(id)
    await loadNotes()
  }
}

onMounted(loadNotes)
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: #fafafa;
  color: #232323;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}
.header {
  background: #4F8A8B;
  color: #fff;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
}
.header h1 {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
}
.main-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem 4rem 1rem;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  position: relative;
}
.add-btn {
  position: fixed;
  bottom: 2.2rem;
  right: 2.2rem;
  background: #FBD46D;
  color: #232323;
  border: none;
  box-shadow: 0 2px 12px 1px rgba(79, 138, 139, 0.13);
  border-radius: 50%;
  width: 3.4rem;
  height: 3.4rem;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.15s;
  z-index: 22;
}
.add-btn:hover {
  background: #F67280;
  color: #fff;
}
@media (max-width: 600px) {
  .main-section {
    padding: 1rem 0.4rem 4rem 0.4rem;
  }
}
</style>
