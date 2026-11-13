<template>
  <div class="chatbot-container">
    <!-- Botón flotante -->
    <Transition name="bounce">
      <button
        v-if="!isOpen"
        @click="openChat"
        class="chatbot-button"
        aria-label="Abrir chat"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
      </button>
    </Transition>

    <!-- Ventana del chat -->
    <Transition name="slide-up">
      <div v-if="isOpen" class="chatbot-window">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="flex items-center">
            <div class="chatbot-avatar">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-semibold text-white">Asistente Global Shapers</h3>
              <p class="text-xs text-primary-100">En línea</p>
            </div>
          </div>
          <button
            @click="closeChat"
            class="text-white hover:text-primary-100 transition"
            aria-label="Cerrar chat"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mensajes -->
        <div ref="messagesContainer" class="chatbot-messages">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'message',
              message.role === 'user' ? 'message-user' : 'message-assistant'
            ]"
          >
            <div class="message-content">
              <div class="message-text">{{ message.content }}</div>
              <div class="message-time">
                {{ formatTime(message.timestamp) }}
              </div>
            </div>
          </div>

          <div v-if="loading" class="message message-assistant">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div v-if="error" class="message message-error">
            <div class="message-content">
              <div class="message-text">{{ error }}</div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chatbot-input-container">
          <form @submit.prevent="handleSend" class="chatbot-input-form">
            <input
              v-model="inputMessage"
              type="text"
              placeholder="Escribe tu mensaje..."
              class="chatbot-input"
              :disabled="loading"
            />
            <button
              type="submit"
              :disabled="!inputMessage.trim() || loading"
              class="chatbot-send-button"
              aria-label="Enviar mensaje"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <div class="chatbot-footer-text">
            Powered by Global Shapers Oruro
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatbot } from '@/composables/useChatbot'

const { messages, loading, error, sendMessage, initChat } = useChatbot()

const isOpen = ref(false)
const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const unreadCount = ref(0)

function openChat() {
  isOpen.value = true
  initChat()
  unreadCount.value = 0
  scrollToBottom()
}

function closeChat() {
  isOpen.value = false
}

async function handleSend() {
  if (!inputMessage.value.trim() || loading.value) return

  const message = inputMessage.value
  inputMessage.value = ''
  
  await sendMessage(message)
  await nextTick()
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString('es-BO', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Auto-scroll cuando llegan nuevos mensajes
watch(() => messages.value.length, () => {
  if (isOpen.value) {
    scrollToBottom()
  } else {
    // Incrementar contador de mensajes no leídos si el chat está cerrado
    if (messages.value.length > 0 && messages.value.at(-1)?.role === 'assistant') {
      unreadCount.value++
    }
  }
})
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.chatbot-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  position: relative;
}

.chatbot-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.chatbot-window {
  width: 380px;
  height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chatbot-header {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chatbot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  animation: fadeIn 0.3s ease;
}

.message-user {
  justify-content: flex-end;
}

.message-assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 75%;
}

.message-text {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.message-user .message-text {
  background: #3b82f6;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-assistant .message-text {
  background: white;
  color: #1f2937;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-time {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
  padding: 0 4px;
}

.message-user .message-time {
  text-align: right;
}

.message-error .message-text {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  border-bottom-left-radius: 4px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

.chatbot-input-container {
  border-top: 1px solid #e5e7eb;
  background: white;
}

.chatbot-input-form {
  display: flex;
  padding: 12px;
  gap: 8px;
}

.chatbot-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.chatbot-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.chatbot-input:disabled {
  background: #f9fafb;
  cursor: not-allowed;
}

.chatbot-send-button {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.chatbot-send-button:hover:not(:disabled) {
  background: #2563eb;
}

.chatbot-send-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.chatbot-footer-text {
  text-align: center;
  font-size: 11px;
  color: #9ca3af;
  padding: 8px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.bounce-enter-active {
  animation: bounceIn 0.5s;
}

.bounce-leave-active {
  animation: bounceOut 0.3s;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive */
@media (max-width: 640px) {
  .chatbot-window {
    width: calc(100vw - 32px);
    height: calc(100vh - 100px);
    max-height: 600px;
  }

  .chatbot-container {
    bottom: 16px;
    right: 16px;
  }
}

/* Scrollbar personalizado */
.chatbot-messages::-webkit-scrollbar {
  width: 6px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.chatbot-messages::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
