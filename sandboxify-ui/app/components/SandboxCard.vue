<script setup lang="ts">
import type { Sandbox } from '~/composables/useSandboxes'

const props = defineProps<{
  sandbox: Sandbox
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const confirming = ref(false)

function handleDelete() {
  if (confirming.value) {
    emit('delete', props.sandbox.id)
    confirming.value = false
    return
  }
  confirming.value = true
}

function cancelConfirm() {
  confirming.value = false
}
</script>

<template>
  <div
    class="rounded-[8px] border border-border bg-bg-surface p-6 max-sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
    @mouseleave="cancelConfirm"
  >
    <div class="mb-3 flex items-start justify-between gap-2">
      <span
        class="truncate font-mono text-sm text-text-primary"
        :title="sandbox.id"
      >
        {{ sandbox.id }}
      </span>
      <span
        :class="[
          'inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          sandbox.status === 'running'
            ? 'bg-success/15 text-success'
            : 'bg-bg-elevated text-text-secondary',
        ]"
      >
        {{ sandbox.status }}
      </span>
    </div>

    <div class="mb-4 space-y-1 text-sm text-text-secondary">
      <p>
        Port: <span class="text-text-primary">{{ sandbox.port }}</span>
      </p>
      <p class="truncate" :title="sandbox.frontend_branch">
        Frontend: <span class="text-text-primary">{{ sandbox.frontend_branch }}</span>
      </p>
      <p class="truncate" :title="sandbox.backend_branch">
        Backend: <span class="text-text-primary">{{ sandbox.backend_branch }}</span>
      </p>
    </div>

    <div class="flex items-center gap-3">
      <a
        :href="sandbox.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
      >
        Open
      </a>

      <button
        type="button"
        class="ml-auto text-sm transition-colors duration-200"
        :class="confirming ? 'font-medium text-danger' : 'text-text-secondary hover:text-danger'"
        @click="handleDelete"
        @blur="cancelConfirm"
      >
        {{ confirming ? 'Confirm?' : 'Delete' }}
      </button>
    </div>
  </div>
</template>
