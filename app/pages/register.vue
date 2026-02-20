<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isSubmitting.value = true

  const { error } = await client.auth.signUp({
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
          <label for="register-email" class="sr-only">Email</label>
          <input
            id="register-email"
            v-model="email"
            type="email"
            required
            placeholder="Email"
            autocomplete="email"
            class="w-full rounded-[6px] border border-border bg-bg-elevated px-4 py-3 text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-accent"
          />
        </div>

        <div>
          <label for="register-password" class="sr-only">Password</label>
          <input
            id="register-password"
            v-model="password"
            type="password"
            required
            placeholder="Password"
            autocomplete="new-password"
            class="w-full rounded-[6px] border border-border bg-bg-elevated px-4 py-3 text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-accent"
          />
        </div>

        <div>
          <label for="register-confirm-password" class="sr-only">Confirm password</label>
          <input
            id="register-confirm-password"
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Confirm password"
            autocomplete="new-password"
            class="w-full rounded-[6px] border border-border bg-bg-elevated px-4 py-3 text-text-primary placeholder:text-text-secondary transition-colors duration-200 focus:border-accent"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-[6px] bg-accent py-3 font-medium text-white transition-all duration-200 hover:bg-accent-hover hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {{ isSubmitting ? 'Creating account...' : 'Create account' }}
        </button>

        <p
          v-if="errorMessage"
          role="alert"
          class="text-center text-sm text-danger"
        >
          {{ errorMessage }}
        </p>
      </form>

      <p class="mt-6 text-center text-sm text-text-secondary">
        Already have an account?
        <NuxtLink to="/login" class="text-accent hover:text-accent-hover transition-colors duration-200">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>
