<template>
    <navbar2 />
  <div class="bg-black min-h-screen text-white pt-16 px-4">
    <section class="max-w-7xl mx-auto">
      
      <!-- Header Row: Title + Filter -->
      <div class="flex flex-col md:flex-row justify-between items-center mt-12 mb-12 w-full px-4">
        <!-- Title -->
        <h1 class="text-5xl font-bold text-red-500 underline decoration-white mb-4 md:mb-0 md:mr-6">
            Blog
        </h1>

        <!-- Category Filter -->
        <div class="w-full md:w-auto md:flex md:justify-center">
          <select v-model="selectedCategory" class="bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none w-full md:w-auto">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
      </div>

      <!-- Loading / Error -->
      <div v-if="loading" class="text-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
        <p class="mt-4 text-gray-400">Loading posts...</p>
      </div>
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">Error loading posts: {{ error }}</p>
      </div>

      <!-- Posts Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="post in filteredPosts" 
          :key="post.id"
          @click="navigateToPost(post.slug)"
          class="bg-gray-900 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
        >
          <!-- Featured / first image -->
          <div class="h-48 bg-gray-700 overflow-hidden">
            <img 
              v-if="getPostImage(post)"
              :src="getPostImage(post)" 
              :alt="post.title.rendered"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v6m0 0l2-2m-2 2L9 8"></path>
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2 text-white line-clamp-2" v-html="post.title.rendered"></h3>
            <p class="text-gray-400 text-sm mb-3 line-clamp-3" v-html="getExcerpt(post)"></p>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>{{ formatDate(post.date) }}</span>
              <span v-if="getCategoryName(post.categories[0])" class="bg-red-100 text-red-600 px-2 py-1 rounded">
                {{ getCategoryName(post.categories[0]) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWordPress } from '@/composables/useWordPress'

const { posts, categories, media, loading, error, ensureLoaded } = useWordPress()
const router = useRouter()
const selectedCategory = ref('')

// Ensure WordPress data is loaded
await ensureLoaded()

// Filter posts by selected category
const filteredPosts = computed(() => {
  if (!selectedCategory.value) return posts.value
  return posts.value.filter(post => post.categories.includes(Number(selectedCategory.value)))
})

// Navigate to post detail
const navigateToPost = (slug) => router.push(`/blog/${slug}`)

// Get media URL by featured_media or first image in content
const getPostImage = (post) => {
  if (post.featured_media) {
    const mediaItem = media.value.find(item => item.id === post.featured_media)
    if (mediaItem) return mediaItem.source_url
  }
  const imgMatch = post.content?.rendered?.match(/<img.*?src="(.*?)"/)
  return imgMatch ? imgMatch[1] : null
}

// Get category name
const getCategoryName = (catId) => {
  const cat = categories.value.find(c => c.id === catId)
  return cat ? cat.name : null
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Get excerpt
const getExcerpt = (post) => {
  if (post.excerpt?.rendered) return post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
  if (post.content?.rendered) return post.content.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
  return 'No excerpt available...'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
