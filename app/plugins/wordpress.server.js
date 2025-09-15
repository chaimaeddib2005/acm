export default defineNuxtPlugin(async () => {
  const wordpressStore = useWordPressStore()
  
  // Fetch data on server for SSR
  await wordpressStore.fetchAllData()
})