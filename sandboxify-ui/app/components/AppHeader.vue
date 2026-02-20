<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

async function signOut() {
  await client.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <header class="sticky top-0 z-50 flex h-14 w-full items-center border-b border-border bg-bg-surface px-4">
    <NuxtLink to="/" class="font-heading text-xl font-semibold text-accent transition-colors duration-200 hover:text-accent-hover">
      SandBoxify
    </NuxtLink>

    <div class="ml-auto flex items-center gap-3">
      <ThemeToggle />

      <span
        v-if="user?.email"
        class="hidden max-w-[200px] truncate text-sm text-text-secondary sm:inline"
        :title="user.email"
      >
        {{ user.email }}
      </span>

      <button
        type="button"
        aria-label="Sign out"
        class="rounded-[6px] px-3 py-1.5 text-sm text-text-secondary transition-colors duration-200 hover:text-danger"
        @click="signOut"
      >
        Sign out
      </button>
    </div>
  </header>
</template>
