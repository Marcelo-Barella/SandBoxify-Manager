export interface Sandbox {
  id: string
  status: string
  port: number
  url: string
  containers: { frontend: string; backend: string }
  frontend_branch: string
  backend_branch: string
}

export function useSandboxes() {
  const config = useRuntimeConfig()
  const sandboxes = ref<Sandbox[]>([])
  const isLoading = ref(false)
  const error = ref('')

  async function fetchSandboxes() {
    error.value = ''
    try {
      await $fetch('/sandboxes', {
        baseURL: config.public.sandboxifyApiUrl as string,
        onRequest() {
          isLoading.value = true
        },
        onResponse({ response }) {
          sandboxes.value = response._data.sandboxes
          isLoading.value = false
        },
        onResponseError({ response }) {
          error.value = response._data?.error || 'Failed to load sandboxes'
          isLoading.value = false
        },
      })
    } catch (e: unknown) {
      if (!error.value) {
        error.value = e instanceof Error ? e.message : 'Failed to load sandboxes'
      }
      isLoading.value = false
    }
  }

  async function createSandbox() {
    error.value = ''
    try {
      await $fetch('/sandbox', {
        method: 'POST',
        baseURL: config.public.sandboxifyApiUrl as string,
      })
      await fetchSandboxes()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to create sandbox'
      error.value = message
    }
  }

  async function deleteSandbox(id: string) {
    error.value = ''
    try {
      await $fetch(`/sandbox/${id}`, {
        method: 'DELETE',
        baseURL: config.public.sandboxifyApiUrl as string,
      })
      await fetchSandboxes()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to delete sandbox'
      error.value = message
    }
  }

  return {
    sandboxes,
    isLoading,
    error,
    fetchSandboxes,
    createSandbox,
    deleteSandbox,
  }
}
