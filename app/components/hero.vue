<template>
  <div class="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#0D0D0D] to-black relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
      <div class="absolute bottom-20 left-1/2 w-72 h-72 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 opacity-5">
      <div 
        class="absolute inset-0" 
        style="background-image: repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255, 255, 255, 0.05) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255, 255, 255, 0.05) 32px);">
      </div>
    </div>

    <div class="relative z-10 container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center min-h-screen">
      <!-- Content Section -->
      <div class="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
        <!-- Logo/Badge -->
        <div class="inline-flex items-center bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-full px-4 py-2 mb-8">
          <div class="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
          <span class="text-red-400 text-sm font-medium tracking-wide">UM6P ACM STUDENT CHAPTER</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Welcome to
          <span class="block text-red-500">
            ACM UM6P
          </span>
        </h1>

        <!-- Description -->
        <p class="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
          Empowering the next generation of computer science leaders through 
          <span class="text-red-500 font-semibold">innovation</span>, 
          <span class="text-red-500 font-semibold">collaboration</span>, and 
          <span class="text-red-500 font-semibold">excellence</span>.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            @click="$emit('scroll', 'vision')"
            class="px-8 py-4 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50"
          >
            Learn More
          </button>

          <button
            @click="$emit('navigate', '/membership')"
            class="px-8 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-600/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/30"
          >
            Join Our Community
          </button>
        </div>
      </div>

      <!-- Image Section -->
      <div class="flex-1 relative max-w-lg mx-auto lg:max-w-none">
        <div class="relative">
          <!-- Loading state -->
          <div v-if="isLoading" class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          </div>

          <!-- Image content -->
          <div v-else class="relative">
            <!-- Glow background -->
            <div class="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-2xl"></div>
            <div class="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-red-600/10 rounded-2xl"></div>

            <!-- Image container -->
            <div class="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <img 
                v-if="source"
                :src="source"
                alt="ACM UM6P" 
                class="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
              />
              <div 
                v-else
                class="w-full h-64 lg:h-80 bg-gray-700 rounded-lg shadow-lg flex items-center justify-center"
              >
                <span class="text-gray-400">No image available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-700"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      source: '',
      isLoading: true
    }
  },

  async mounted() {
    try {
      const wordpress = useWordPress()

      // Wait for WordPress data to be loaded
      await wordpress.ensureLoaded()

      // Get the hero image from page ID 75
      const page = wordpress.getPageById(75)
      this.source = page?.acf?.hero_image || ''

    } catch (error) {
      console.error('Error loading page data:', error)
    } finally {
      this.isLoading = false
    }
  }
}
</script>
