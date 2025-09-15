<template>
  <section class="py-16 bg-black">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(activity, index) in activities"
          :key="index"
          class="p-4 bg-white rounded-lg shadow-lg"
        >
          <!-- Title above image -->
          <h2 class="text-xl font-bold mb-4 text-red-600 text-center">
            {{ activity.activity_name }}
          </h2>

          <!-- Image with hover overlay -->
          <div class="relative group w-full h-60 rounded-md overflow-hidden shadow-md">
            <img
              :src="activity.activity_image"
              alt="Activity Image"
              class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
            />
            <!-- Hover description -->
            <div
              class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500"
            >
              <p class="text-white text-center px-4">
                {{ activity.activity_description_ }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      isLoading: true
    }
  },
  async mounted() {
    try {
      const wordpress = useWordPress()
      await wordpress.ensureLoaded()
      const page = wordpress.getPageById(75)
      console.log('Fetched page data:', page)

      // collect activities dynamically
      for (let key in page.acf) {
        if (key.startsWith('activity')) {
          this.activities.push(page.acf[key])
        }
      }
    } catch (error) {
      console.error('Error loading page data:', error)
    } finally {
      this.isLoading = false
    }
  }
}
</script>
