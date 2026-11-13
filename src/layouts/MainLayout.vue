<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    
    <main class="flex-grow">
      <slot />
    </main>
    
    <AppFooter />
    
    <!-- Chatbot flotante -->
    <FloatingChatbot />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import FloatingChatbot from '@/components/FloatingChatbot.vue'
</script>
