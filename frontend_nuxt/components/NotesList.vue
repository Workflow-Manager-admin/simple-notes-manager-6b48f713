<template>
  <div class="notes-grid">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="notes?.length === 0" class="no-notes">No notes yet. Click "+" to add.</div>
    <div v-else class="notes-list">
      <div v-for="note in notes" :key="note.id" class="note-card">
        <div class="note-title">{{ note.title }}</div>
        <div class="note-content">{{ note.content }}</div>
        <div class="note-actions">
          <button class="edit-btn" @click="$emit('edit', note)">Edit</button>
          <button class="delete-btn" @click="$emit('delete', note.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  notes: { id: number, title: string, content: string, created_at?: string }[]
  loading?: boolean
}>()
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.notes-grid {
  width: 100%;
}
.loading {
  text-align: center;
  color: #4F8A8B;
  font-size: 1.2rem;
  width: 100%;
  margin-top: 2rem;
}
.no-notes {
  text-align: center;
  width: 100%;
  color: #aaa;
  font-size: 1.1rem;
  margin-top: 2rem;
}
.notes-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.3rem;
  width: 100%;
}
.note-card {
  background: #fff;
  box-shadow: 0 2px 10px 0 rgba(79, 138, 139, 0.09);
  border-radius: 12px;
  padding: 1rem 1.1rem 0.7rem 1.1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 130px;
  transition: box-shadow .13s;
}
.note-card:hover {
  box-shadow: 0 4px 16px 0 rgba(246, 114, 128, 0.17);
}
.note-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #4F8A8B;
  margin-bottom: 0.2rem;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.note-content {
  font-size: 1rem;
  color: #232323;
  margin-bottom: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 60px;
}

.note-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
.edit-btn,
.delete-btn {
  border: none;
  padding: 0.38rem 1rem;
  border-radius: 8px;
  font-size: 0.97rem;
  margin: 0;
  cursor: pointer;
  transition: background 0.13s;
}
.edit-btn {
  background: #4F8A8B;
  color: #fff;
}
.edit-btn:hover {
  background: #38707c;
}
.delete-btn {
  background: #F67280;
  color: #fff;
}
.delete-btn:hover {
  background: #ba4957;
}
</style>
