<template>
  <div class="bg-black text-white min-h-screen py-16">
    <section class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-bold mb-12 text-red-500 underline decoration-white text-center">Meet the Team</h2>
      
      <div v-if="loading" class="text-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
        <p class="mt-4 text-gray-300">Loading team members...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">Error loading team: {{ error }}</p>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="member in teamMembers" 
          :key="member.post_name"
          class="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 hover:scale-105 transform transition-all duration-300"
        >
          <img 
            :src="member.post_image" 
            :alt="member.member_name" 
            class="w-32 h-32 object-cover rounded-full mb-4 border-2 border-red-500"
          />
          <h3 class="font-bold text-xl text-white text-center mb-1">{{ member.member_name }}</h3>
          <p class="text-red-500 text-sm font-semibold mb-2">{{ member.post_name }}</p>
          <p class="text-gray-300 text-center text-sm mb-4">{{ member.description }}</p>
          
          <a 
            v-if="member.linkedin" 
            :href="member.linkedin" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-full w-10 h-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-white">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.783 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.571c.719-1.043 2.043-1.571 3.5-1.571 2.481 0 4.5 2.019 4.5 4.5v5.5z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async setup() {
    const { getPageById, loading, error, ensureLoaded } = useWordPress()

    await ensureLoaded()

    const page75 = await getPageById(75)

    const teamMembers = computed(() => {
      if (!page75 || !page75.acf) return []
      const acf = page75.acf
      return Object.values(acf).filter(item => item?.post_name)
    })

    return {
      teamMembers,
      loading,
      error
    }
  }
}
</script>

<style scoped>
/* Optional: hover scale handled via Tailwind already */
</style>
