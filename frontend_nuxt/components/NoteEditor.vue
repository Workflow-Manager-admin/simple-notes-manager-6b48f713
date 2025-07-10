<template>
  <div class="modal-overlay" @click.self="cancel">
    <div class="modal-card" tabindex="-1" ref="focusCard">
      <form @submit.prevent="saveNote">
        <h2>{{ note?.id ? 'Edit Note' : 'New Note' }}</h2>
        <label>
          Title
          <input v-model="form.title" type="text" maxlength="80" required autofocus />
        </label>
        <label>
          Content
          <textarea v-model="form.content" rows="5" maxlength="800" required />
        </label>
        <div class="actions">
          <button type="button" @click="cancel" class="secondary">Cancel</button>
          <button type="submit" :disabled="saving">{{ saving ? "Saving..." : "Save" }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue"

const props = defineProps<{
  note: { id?: number, title?: string, content?: string } | null
  saving?: boolean
}>()
const emits = defineEmits(['close', 'save'])

const form = ref({ title: '', content: '' })
const focusCard = ref<HTMLDivElement | null>(null)

watch(
  () => props.note,
  (note) => {
    form.value = { title: note?.title ?? '', content: note?.content ?? '', ...(note?.id ? { id: note.id } : {}) }
  },
  { immediate: true }
)

onMounted(() => {
  setTimeout(() => focusCard.value?.focus(), 100)
})

function cancel() {
  emits('close')
}

// PUBLIC_INTERFACE
function saveNote() {
  if (form.value.title.trim().length === 0 || form.value.content.trim().length === 0) return
  emits('save', { ...form.value })
}
</script>

<style scoped>
.modal-overlay {
  background: rgba(49,49,60,0.14);
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px 1px rgba(79, 138, 139, 0.12);
  padding: 2.1rem 2.1rem 1.5rem 2.1rem;
  width: 100%;
  max-width: 410px;
  outline: none;
}
h2 {
  font-weight: 700;
  margin: 0 0 1.1rem 0;
  font-size: 1.28rem;
  color: #4F8A8B;
}
label {
  display: flex;
  flex-direction: column;
  font-size: 1.02rem;
  color: #808080;
  margin-bottom: 1rem;
  font-weight: 500;
}
input[type="text"],
textarea {
  font-size: 1rem;
  color: #232323;
  border: 1.5px solid #FBD46D;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  margin-top: 0.32rem;
  background: #f8f9fa;
  outline: none;
  transition: border .13s;
}
input[type="text"]:focus,
textarea:focus {
  border-color: #4F8A8B;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 1.15rem;
}
button {
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.35rem;
  font-size: 1.04rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .11s;
  background: #4F8A8B;
  color: #fff;
}
button.secondary {
  background: #FBD46D;
  color: #232323;
}
button.secondary:hover {
  background: #ffe288;
}
button:disabled {
  opacity: 0.72;
  cursor: wait;
}
button:hover:not(:disabled) {
  background: #38707c;
}
</style>
