<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { sandboxes, isLoading, error, fetchSandboxes, createSandbox, deleteSandbox } = useSandboxes()

const isCreating = ref(false)

async function handleCreate() {
  isCreating.value = true
  await createSandbox()
  isCreating.value = false
}

async function handleDelete(id: string) {
  await deleteSandbox(id)
}

onMounted(() => {
  fetchSandboxes()
})
</script>

<template>
  <div>
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="font-heading text-3xl font-semibold text-text-primary">
        Sandboxes
      </h1>
      <button
        type="button"
        :disabled="isCreating"
        class="inline-flex items-center justify-center rounded-[6px] bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        @click="handleCreate"
      >
        {{ isCreating ? 'Creating...' : 'New Sandbox' }}
      </button>
    </div>

    <p
      v-if="error"
      role="alert"
      class="mb-6 rounded-[6px] border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
    >
      {{ error }}
    </p>

    <div
      v-if="isLoading"
      aria-busy="true"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <SandboxSkeleton v-for="n in 6" :key="n" />
    </div>

    <div
      v-else-if="sandboxes.length === 0"
      class="flex flex-col items-center justify-center py-24 text-center"
    >
      <p class="text-lg font-medium text-text-primary">
        No sandboxes yet
      </p>
      <p class="mt-1 text-sm text-text-secondary">
        Create your first sandbox to get started.
      </p>
    </div>

    <div
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <SandboxCard
        v-for="sandbox in sandboxes"
        :key="sandbox.id"
        :sandbox="sandbox"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
