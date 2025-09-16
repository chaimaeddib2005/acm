<template>
  <header class="bg-white shadow-md fixed w-full z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">

      <!-- Logos clickable to navigate home -->
      <NuxtLink to="/" class="flex items-center space-x-4 md:space-x-6 cursor-pointer">
        <img src="/logo_acm.png" alt="Logo" class="h-14 w-auto" />
        <img src="/um6p.png" alt="um6p_logo" class="h-8 w-auto" />
      </NuxtLink>

      <!-- Desktop navigation -->
      <nav class="hidden md:flex">
        <ul class="flex space-x-6 items-center">
          <li @click="$emit('scroll', 'vision')" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">About</li>
          <li @click="$emit('scroll', 'team')" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">The Team</li>
          <li @click="$emit('scroll', 'contacts')" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">Contact</li>
          <li @click="$emit('navigate', '/blog')" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">Blog</li>
          <li class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">
            <a href="https://tally.so/r/m61eDA">Become a Member</a>
          </li>
          <li class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">
            <NuxtLink to="/alumni">Alumni</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-700 hover:text-red-500 focus:outline-none">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-7 w-7">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-7 w-7">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile navigation menu -->
    <transition name="slide-fade">
      <nav v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-md">
        <ul class="flex flex-col space-y-2 px-6 py-2">
          <li @click="$emit('scroll', 'vision'); isMobileMenuOpen=false" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">About</li>
          <li @click="$emit('scroll', 'team'); isMobileMenuOpen=false" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">The Team</li>
          <li @click="$emit('scroll', 'contacts'); isMobileMenuOpen=false" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">Contact</li>
          <li @click="$emit('navigate', '/blog'); isMobileMenuOpen=false" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">Blog</li>
          <li @click="$emit('navigate', '/membership'); isMobileMenuOpen=false" class="text-gray-700 hover:text-red-500 cursor-pointer font-medium">Become a Member</li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const isMobileMenuOpen = ref(false)
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
