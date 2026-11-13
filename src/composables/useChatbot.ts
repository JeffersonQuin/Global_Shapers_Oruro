import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function useChatbot() {
  const messages = ref<ChatMessage[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Función para buscar conocimiento relevante en la base de datos
  async function searchKnowledge(query: string) {
    try {
      // Intentar usar la función RPC si existe
      const { data, error: searchError } = await supabase
        .rpc('search_chatbot_knowledge', {
          search_query: query,
          result_limit: 5
        })

      if (searchError) {
        console.warn('RPC search_chatbot_knowledge no disponible, usando query simple:', searchError)
        // Fallback: buscar directamente en la tabla
        const { data: fallbackData } = await supabase
          .from('chatbot_knowledge')
          .select('id, title, content, content_type')
          .eq('is_active', true)
          .limit(5)
        
        return fallbackData || []
      }

      return data || []
    } catch (e) {
      console.error('Error searching knowledge:', e)
      // Si falla, retornar array vacío para que el chatbot siga funcionando
      return []
    }
  }

  // Función para obtener información general del Hub
  async function getHubContext() {
    try {
      // Obtener settings del sitio
      const { data: settings } = await supabase
        .from('site_settings')
        .select('key, value')
        .eq('is_public', true)
        .in('key', ['site_name', 'site_tagline', 'mission_statement', 'vision_statement'])

      // Obtener iniciativas activas
      const { data: initiatives } = await supabase
        .from('v_active_initiatives')
        .select('title, short_description, category_name')
        .eq('is_published', true)
        .limit(5)

      // Obtener próximos eventos
      const { data: events } = await supabase
        .from('events')
        .select('title, description, start_datetime')
        .eq('status', 'published')
        .gte('start_datetime', new Date().toISOString())
        .order('start_datetime', { ascending: true })
        .limit(3)

      // Obtener oportunidades abiertas
      const { data: opportunities } = await supabase
        .from('opportunities')
        .select('title, description, opportunity_type')
        .eq('status', 'open')
        .limit(3)

      return {
        settings: settings || [],
        initiatives: initiatives || [],
        events: events || [],
        opportunities: opportunities || []
      }
    } catch (e) {
      console.error('Error getting hub context:', e)
      return null
    }
  }

  // Función para crear el contexto del sistema
  function buildSystemPrompt(knowledge: any[], hubContext: any) {
    let prompt = `Eres un asistente virtual del Global Shapers Hub Oruro, una comunidad de jóvenes líderes parte del Foro Económico Mundial.

TU ROL:
- Responder preguntas sobre Global Shapers Hub Oruro
- Proporcionar información sobre iniciativas, eventos y oportunidades
- Ayudar a los visitantes a encontrar formas de participar
- Ser amable, profesional y juvenil en tu comunicación

INFORMACIÓN DEL HUB:`

    // Agregar settings
    if (hubContext?.settings) {
      hubContext.settings.forEach((s: any) => {
        if (s.value) {
          prompt += `\n- ${s.key}: ${JSON.stringify(s.value)}`
        }
      })
    }

    // Agregar iniciativas
    if (hubContext?.initiatives?.length > 0) {
      prompt += `\n\nINICIATIVAS ACTIVAS:`
      hubContext.initiatives.forEach((i: any) => {
        prompt += `\n- ${i.title} (${i.category_name}): ${i.short_description}`
      })
    }

    // Agregar eventos
    if (hubContext?.events?.length > 0) {
      prompt += `\n\nPRÓXIMOS EVENTOS:`
      hubContext.events.forEach((e: any) => {
        const date = new Date(e.start_datetime).toLocaleDateString('es-BO')
        prompt += `\n- ${e.title} (${date}): ${e.description.substring(0, 150)}...`
      })
    }

    // Agregar oportunidades
    if (hubContext?.opportunities?.length > 0) {
      prompt += `\n\nOPORTUNIDADES DISPONIBLES:`
      hubContext.opportunities.forEach((o: any) => {
        prompt += `\n- ${o.title} (${o.opportunity_type}): ${o.description.substring(0, 150)}...`
      })
    }

    // Agregar conocimiento específico de la búsqueda
    if (knowledge.length > 0) {
      prompt += `\n\nINFORMACIÓN RELEVANTE:`
      knowledge.forEach((k: any) => {
        prompt += `\n\n**${k.title}**\n${k.content}`
      })
    }

    prompt += `\n\nIMPORTANTE:
- Si no sabes algo, admítelo honestamente. No inventes información.
- Dirige a los usuarios a las secciones correctas del sitio cuando sea apropiado.
- Si preguntan cómo participar, menciona el formulario "Participa con Nosotros".
- Si preguntan sobre problemas comunitarios, menciona "Propón una Idea".
- Mantén respuestas concisas (máximo 3-4 párrafos).
- Usa un tono amigable pero profesional.
- Responde siempre en español.`

    return prompt
  }

  // Función principal para enviar mensaje
  async function sendMessage(userMessage: string) {
    if (!userMessage.trim()) return

    // Verificar API key
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, el chatbot no está configurado correctamente. Contacta al administrador del sitio.',
        timestamp: new Date()
      }
      messages.value.push(errorMsg)
      console.error('VITE_GROQ_API_KEY no está configurada')
      return
    }

    // Agregar mensaje del usuario
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    messages.value.push(userMsg)

    loading.value = true
    error.value = null

    try {
      console.log('🤖 Iniciando procesamiento de mensaje:', userMessage)

      // Buscar conocimiento relevante
      console.log('📚 Buscando conocimiento relevante...')
      const knowledge = await searchKnowledge(userMessage)
      console.log('✓ Conocimiento encontrado:', knowledge.length, 'resultados')
      
      // Obtener contexto del Hub
      console.log('🏢 Obteniendo contexto del Hub...')
      const hubContext = await getHubContext()
      console.log('✓ Contexto obtenido')

      // Construir prompt del sistema
      const systemPrompt = buildSystemPrompt(knowledge, hubContext)
      console.log('✓ System prompt construido:', systemPrompt.length, 'caracteres')

      // Preparar mensajes para Groq
      const chatMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.value.map(m => ({
          role: m.role,
          content: m.content
        }))
      ]

      console.log('🚀 Llamando a Groq API...')
      console.log('📨 Mensajes a enviar:', chatMessages.length)

      // Llamar a Groq API usando fetch
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b', // Modelo correcto de Groq
          messages: chatMessages,
          temperature: 0.7,
          max_tokens: 800,
          top_p: 1,
        })
      })

      console.log('📥 Respuesta de Groq recibida, status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ Error de Groq API:', response.status, errorData)
        throw new Error(errorData.error?.message || `Error ${response.status}`)
      }

      const completion = await response.json()
      console.log('✓ Completion parseado:', completion)
      
      const assistantMessage = completion.choices[0]?.message?.content || 
        'Lo siento, no pude procesar tu mensaje. Por favor intenta de nuevo.'

      console.log('✓ Mensaje del asistente:', assistantMessage.substring(0, 100) + '...')

      // Agregar respuesta del asistente
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date()
      }
      messages.value.push(assistantMsg)

      // Opcional: Guardar conversación en la base de datos
      await saveConversation(userMessage, assistantMessage)
      console.log('✅ Mensaje procesado exitosamente')

    } catch (e: any) {
      console.error('Error completo:', e)
      
      let errorMsg = 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.'
      
      if (e.message?.includes('401') || e.message?.includes('authentication')) {
        errorMsg = 'Error de autenticación. Verifica la configuración del chatbot.'
      } else if (e.message?.includes('429') || e.message?.includes('rate limit')) {
        errorMsg = 'Se ha excedido el límite de peticiones. Por favor intenta en unos minutos.'
      } else if (e.message?.includes('Failed to fetch') || e.message?.includes('network')) {
        errorMsg = 'Error de conexión. Verifica tu conexión a internet.'
      }
      
      error.value = errorMsg
      
      const errorChatMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date()
      }
      messages.value.push(errorChatMsg)
    } finally {
      loading.value = false
    }
  }

  // Función para guardar la conversación (opcional)
  async function saveConversation(userMessage: string, botResponse: string) {
    try {
      await supabase.from('chatbot_conversations').insert({
        session_id: getSessionId(),
        user_message: userMessage,
        bot_response: botResponse,
      })
    } catch (e) {
      console.error('Error saving conversation:', e)
    }
  }

  // Función para obtener o crear session ID
  function getSessionId(): string {
    let sessionId = sessionStorage.getItem('chatbot_session_id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      sessionStorage.setItem('chatbot_session_id', sessionId)
    }
    return sessionId
  }

  // Función para resetear el chat
  function resetChat() {
    messages.value = []
    error.value = null
  }

  // Mensaje de bienvenida inicial
  function initChat() {
    if (messages.value.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: '¡Hola! 👋 Soy el asistente virtual de Global Shapers Hub Oruro. Puedo ayudarte con información sobre nuestras iniciativas, eventos, oportunidades y cómo participar. ¿En qué puedo ayudarte?',
        timestamp: new Date()
      }
      messages.value.push(welcomeMsg)
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
    resetChat,
    initChat
  }
}
