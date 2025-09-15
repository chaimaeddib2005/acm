<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Navbar always on top -->
    <navbar 
      class="fixed top-0 left-0 w-full z-50" 
      @scroll="handleScroll"
      @navigate="handleNavigate"
    />

    <!-- Main content -->
    <div class="pt-16"> <!-- padding only once -->
      <hero @scroll="handleScroll" @navigate="handleNavigate" />

      <section ref="visionRef" class="my-20 text-center">
        <h1 class="text-5xl font-bold mb-10 block text-red-500 underline decoration-white">Our Vision</h1>
        <vision />
      </section>

      <section class="my-20 text-center">
        <h1 class="text-5xl font-bold mb-10 block text-red-500 underline decoration-white">Our Activities</h1>
        <activities />
      </section>

      <!-- Newsletter Section -->
      <section class="my-20 text-center px-4">
        <div class="mb-10">
          <NuxtLink 
            to="/blog" 
            class="inline-block bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Our Blog
          </NuxtLink>
        </div>

        <div v-if="loading" class="text-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p class="mt-4 text-gray-300">Loading latest posts...</p>
        </div>

        <div v-else-if="error" class="text-center py-10">
          <p class="text-red-500">Error loading posts: {{ error }}</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
          <div 
            v-for="post in latestPosts" 
            :key="post.id"
            @click="navigateToPost(post.slug)"
            class="bg-gray-900 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            <div class="h-48 bg-gray-800 overflow-hidden">
              <img 
                v-if="getMediaUrl(post)"
                :src="getMediaUrl(post)" 
                :alt="post.title.rendered"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-700">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v6m0 0l2-2m-2 2L9 8"></path>
                </svg>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 text-white line-clamp-2" v-html="post.title.rendered"></h3>
              <p class="text-gray-300 text-sm mb-3 line-clamp-3" v-html="getExcerpt(post)"></p>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ formatDate(post.date) }}</span>
                <span v-if="getCategoryName(post.categories[0])" class="bg-red-100 text-red-600 px-2 py-1 rounded">
                  {{ getCategoryName(post.categories[0]) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <NuxtLink 
            to="/blog" 
            class="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Read More
          </NuxtLink>
        </div>
      </section>

      <section ref="teamRef" class="my-20 text-center">
        <team />
      </section>
    </div>

    <section ref="contactsRef">
      <contacts />
    </section>
  </div>
</template>

<script>
import { ref, computed, nextTick } from 'vue'

export default {
  async setup() {
    const { posts, media, categories, loading, error, ensureLoaded } = useWordPress()
    const router = useRouter()

    await ensureLoaded()

    const latestPosts = computed(() => {
      return posts.value
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4)
    })

    const navigateToPost = (slug) => router.push(`/blog/${slug}`)
    const getMediaUrl = (post) => {
      if (post.featured_media) {
        const mediaItem = media.value.find(item => item.id === post.featured_media)
        if (mediaItem?.source_url) return mediaItem.source_url
      }
      const imgMatch = post.content?.rendered?.match(/<img[^>]+src="([^">]+)"/i)
      return imgMatch ? imgMatch[1] : null
    }
    const getCategoryName = (categoryId) => {
      const category = categories.value.find(cat => cat.id === categoryId)
      return category?.name || null
    }
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
    const getExcerpt = (post) => {
      if (post.excerpt?.rendered) return post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
      if (post.content?.rendered) return post.content.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
      return 'No excerpt available...'
    }

    // **Refs for scrolling**
    const visionRef = ref(null)
    const teamRef = ref(null)
    const contactsRef = ref(null)

    const handleScroll = async (section) => {
      // Wait until DOM is updated
      await nextTick()
      let el = null
      if (section === 'vision') el = visionRef.value
      if (section === 'team') el = teamRef.value
      if (section === 'contacts') el = contactsRef.value
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const handleNavigate = (path) => router.push(path)

    return {
      latestPosts,
      loading,
      error,
      navigateToPost,
      getMediaUrl,
      getCategoryName,
      formatDate,
      getExcerpt,
      visionRef,
      teamRef,
      contactsRef,
      handleScroll,
      handleNavigate
    }
  }
}
</script>
