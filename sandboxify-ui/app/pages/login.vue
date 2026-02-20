<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true

  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  isSubmitting.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  await navigateTo('/')
}
</script>

<template>
  <div class="w-full max-w-[400px] animate-[fade-in-up_400ms_ease-out]">
    <div class="rounded-[8px] border border-border bg-bg-surface p-8">
      <h1 class="mb-8 text-center font-heading text-3xl font-bold text-accent">
        SandBoxify
      </h1>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div>
          <label for="login-email" class="sr-only">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            required
            placeholder="Email"
            autocomplete="email"
            class="w-full rounded-[6px] border border-border bg-bg-elevated px-4 py-3 text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-accent"
          />
        </div>

        <div>
          <label for="login-password" class="sr-only">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            required
            placeholder="Password"
            autocomplete="current-password"
            class="w-full rounded-[6px] border border-border bg-bg-elevated px-4 py-3 text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-accent"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-[6px] bg-accent py-3 font-medium text-white transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
        </button>

        <p
          v-if="errorMessage"
          role="alert"
          class="text-center text-sm text-danger"
        >
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>
