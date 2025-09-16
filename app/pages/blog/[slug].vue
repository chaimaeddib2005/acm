<template>
    <navbar2 />
  <div class="bg-black min-h-screen text-white pt-16 px-4">
    
    <section class="max-w-4xl mx-auto py-12">

      <!-- Loading state -->
      <div v-if="!post" class="text-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
        <p class="mt-4 text-gray-400">Loading post...</p>
      </div>

      <!-- Post content -->
      <div v-else>
        <!-- Post Title -->
        <h1 class="text-5xl font-bold text-red-500 underline decoration-white mb-6" v-html="post.title.rendered"></h1>
        <!-- Post Content -->
        <div class="prose prose-invert max-w-full mb-8" v-html="post.content.rendered"></div>

        <!-- Social Share -->
        <div class="flex flex-wrap items-center gap-6 text-2xl">
          <Twitter @click="shareTwitter" class="cursor-pointer hover:text-blue-400 transition-colors"/>
          <Linkedin @click="shareLinkedIn" class="cursor-pointer hover:text-blue-600 transition-colors"/>
          <Facebook @click="shareFacebook" class="cursor-pointer hover:text-blue-500 transition-colors"/>
          <Instagram @click="shareInstagram" class="cursor-pointer hover:text-pink-500 transition-colors"/>
          <Clipboard @click="copyLink" class="cursor-pointer hover:text-green-500 transition-colors"/>
        </div>

        <!-- Copy Link Feedback -->
        <p v-if="copied" class="text-green-500 mt-2">Link copied to clipboard!</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWordPress } from '@/composables/useWordPress'

// Lucide Icons
import { Twitter, Linkedin, Facebook, Instagram, Clipboard } from 'lucide-vue-next'

const route = useRoute()
const slug = route.params.slug

const { getPostBySlug, media, ensureLoaded } = useWordPress()

const post = ref(null)
const postImage = ref(null)
const copied = ref(false)

onMounted(async () => {
  await ensureLoaded()
  post.value = getPostBySlug(slug)

  if (post.value) {
    // Get featured image or first image from content
    if (post.value.featured_media) {
      const mediaItem = media.value.find(item => item.id === post.value.featured_media)
      if (mediaItem) postImage.value = mediaItem.source_url
    }
    if (!postImage.value) {
      const imgMatch = post.value.content?.rendered?.match(/<img.*?src="(.*?)"/)
      if (imgMatch) postImage.value = imgMatch[1]
    }
  }
})

// Social share functions
const shareTwitter = () => {
  if (!post.value) return
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(post.value.title.rendered)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareLinkedIn = () => {
  if (!post.value) return
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

const shareFacebook = () => {
  if (!post.value) return
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareInstagram = () => {
  alert("Instagram does not support direct post sharing via web. Use the app instead!")
}

// Copy link function
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (err) {
    console.error("Failed to copy:", err)
  }
}
</script>

<style scoped>
.prose a {
  color: #f87171; /* Tailwind red-400 */
}
</style>
