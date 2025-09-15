// plugins/wordpress.client.js
export default defineNuxtPlugin({
  name: 'wordpress-data',
  parallel: true,
  async setup(nuxtApp) {
    // Only run on client side after Pinia is ready
    if (process.client) {
      // Wait for next tick to ensure Pinia is initialized
      await new Promise(resolve => setTimeout(resolve, 0))
      
      try {
        const wordpressStore = useWordPressStore()
        if (!wordpressStore.isLoaded && !wordpressStore.loading) {
          await wordpressStore.fetchAllData()
        }
      } catch (error) {
        console.warn('Could not fetch WordPress data:', error.message)
      }
    }
  }
})