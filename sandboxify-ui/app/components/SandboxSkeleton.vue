<template>
  <div
    aria-hidden="true"
    class="rounded-[8px] border border-border bg-bg-surface p-6 max-sm:p-4"
  >
    <div class="mb-3 flex items-start justify-between gap-2">
      <div class="h-5 w-28 rounded bg-bg-elevated skeleton" />
      <div class="h-5 w-16 rounded-full bg-bg-elevated skeleton" />
    </div>

    <div class="mb-4 space-y-2">
      <div class="h-4 w-20 rounded bg-bg-elevated skeleton" />
      <div class="h-4 w-40 rounded bg-bg-elevated skeleton" />
      <div class="h-4 w-36 rounded bg-bg-elevated skeleton" />
    </div>

    <div class="flex items-center gap-3">
      <div class="h-4 w-10 rounded bg-bg-elevated skeleton" />
      <div class="ml-auto h-4 w-12 rounded bg-bg-elevated skeleton" />
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-bg-elevated) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
</style>
