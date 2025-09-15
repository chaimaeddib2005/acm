<template>
  <footer class="bg-neutral-900 text-white py-12">
    <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-10 px-6">
      <!-- Email -->
      <div class="bg-neutral-800 rounded-2xl p-8 text-center shadow-lg">
        <div class="flex justify-center mb-4">
          <div class="bg-red-500 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm0 2h20l-10 7L2 6zm0 2.236 8.803 6.163a1 1 0 0 0 1.197 0L22 8.236V18H2V8.236z"/>
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-2">Email Us</h3>
        <p>
          <a 
            href="mailto:contact@um6p.acm.org" 
            class="text-gray-300 hover:text-red-500 transition-colors"
          >
            contact@um6p.acm.org
          </a>
        </p>
      </div>

      <!-- Location -->
      <div class="bg-neutral-800 rounded-2xl p-8 text-center shadow-lg">
        <div class="flex justify-center mb-4">
          <div class="bg-red-500 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-2">Visit Us</h3>
        <p class="text-gray-300">
          Mohammed VI Polytechnic University,<br />
          College of Computing building
        </p>
      </div>
    </div>

    <!-- Social Media -->
    <div class="flex justify-center space-x-6 mb-6">
      <!-- LinkedIn -->
      <a
        href="https://www.linkedin.com/company/um6p-acm-student-chapter"
        target="_blank"
        aria-label="LinkedIn"
        class="text-white hover:text-blue-500 transition-colors border-white p-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4 0 4.75 2.6 4.75 6V24h-4v-7.9c0-1.9-.03-4.4-2.7-4.4-2.7 0-3.1 2.1-3.1 4.3V24h-4V8z"/>
        </svg>
      </a>

      <!-- Instagram -->
      <a
        href="https://www.instagram.com/acm_um6p?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        aria-label="Instagram"
        class="text-white hover:text-pink-500 transition-colors border-white p-2 rounded-full" 
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0-2C3.47 0 0 3.47 0 7.75v8.5C0 20.53 3.47 24 7.75 24h8.5C20.53 24 24 20.53 24 16.25v-8.5C24 3.47 20.53 0 16.25 0h-8.5z"/>
          <path d="M12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0-2A7.25 7.25 0 1 0 12 19.25 7.25 7.25 0 0 0 12 4.75zM18.5 5.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"/>
        </svg>
      </a>
    </div>

    <!-- Footer Text -->
    <div class="text-center text-gray-400 text-sm">
      <p>All Rights Reserved © ACM-UM6P 2025</p>
      <p class="mt-1">Made by the UM6P ACM Student Chapter Webmaster</p>
    </div>
  </footer>
</template>

<script setup>
// purely presentational
</script>
