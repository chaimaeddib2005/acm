// composables/useWordPress.js
export const useWordPress = () => {
  // Use try-catch to handle cases where Pinia isn't ready
  let store = null
  try {
    store = useWordPressStore()
  } catch (error) {
    console.warn('Pinia store not available yet:', error.message)
    // Return a mock store for SSR or early rendering
    return createFallbackStore()
  }

  return {
    posts: computed(() => store.posts),
    pages: computed(() => store.pages),
    categories: computed(() => store.categories),
    media: computed(() => store.media),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    isLoaded: computed(() => store.isLoaded),
    
    getPageById: (id) => store.getPageById(id),
    getPostBySlug: (slug) => store.getPostBySlug(slug),
    getPageBySlug: (slug) => store.getPageBySlug(slug),
    getCategoryById: (id) => store.getCategoryById(id),
    
    async ensureLoaded() {
      try {
        await store.fetchAllData()
      } catch (error) {
        console.error('Error ensuring data is loaded:', error)
      }
    }
  }
}

// Fallback store for when Pinia isn't available
function createFallbackStore() {
  const fallbackState = {
    posts: [], 
    pages: [], 
    categories: [], 
    media: [], 
    loading: false, 
    error: null, 
    isLoaded: false
  }
  
  return {
    posts: ref([]),
    pages: ref([]),
    categories: ref([]),
    media: ref([]),
    loading: ref(false),
    error: ref(null),
    isLoaded: ref(false),
    
    getPageById: () => null,
    getPostBySlug: () => null,
    getPageBySlug: () => null,
    getCategoryById: () => null,
    
    async ensureLoaded() {
      // Do nothing in fallback mode
    }
  }
}
