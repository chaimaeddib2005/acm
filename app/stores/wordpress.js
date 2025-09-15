// stores/wordpress.js
import { defineStore } from 'pinia'

export const useWordPressStore = defineStore('wordpress', {
  state: () => ({
    posts: [],
    pages: [],
    categories: [],
    menus: [],
    media: [],
    isLoaded: false,
    loading: false,
    error: null
  }),

  getters: {
    getPageById: (state) => (id) => {
      console.log("getPageById called with id:", id);
      return state.pages.find(page => page.id === parseInt(id))
    },
    
    getPostBySlug: (state) => (slug) => {
      return state.posts.find(post => post.slug === slug)
    },
    
    getPageBySlug: (state) => (slug) => {
      return state.pages.find(page => page.slug === slug)
    },
    
    getCategoryById: (state) => (id) => {
      return state.categories.find(cat => cat.id === parseInt(id))
    }
  },

  actions: {
    async fetchAllData() {
      if (this.isLoaded || this.loading) return
      
      this.loading = true
      this.error = null
      
      try {
        const config = useRuntimeConfig()
        const baseUrl = config.public.wordpressApiUrl
        
        // Fetch all data at once
        const [posts, pages, categories, media] = await Promise.all([
          $fetch(`${baseUrl}/posts?per_page=100&_embed`),
          $fetch(`${baseUrl}/pages?per_page=100`),
          $fetch(`${baseUrl}/categories?per_page=100`),
          $fetch(`${baseUrl}/media?per_page=50`)
        ])
        
        this.posts = posts
        this.pages = pages
        this.categories = categories
        this.media = media
        this.isLoaded = true
        
      } catch (error) {
        this.error = error.message
        console.error('WordPress fetch error:', error)
      } finally {
        this.loading = false
      }
    }
  }
})