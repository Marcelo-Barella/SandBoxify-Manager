export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient()
  const { data } = await client.auth.getSession()

  if (!data.session) {
    return navigateTo('/login')
  }
})
