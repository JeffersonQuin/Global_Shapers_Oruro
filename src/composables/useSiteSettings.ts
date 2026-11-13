import { ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { SiteSettings } from '@/types'

export function useSiteSettings() {
  const settings: Ref<SiteSettings> = ref({})
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch all public site settings
  async function fetchSettings() {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('is_public', true)

      if (fetchError) throw fetchError

      // Transform array into key-value object
      const settingsObj: SiteSettings = {}
      data?.forEach((setting) => {
        settingsObj[setting.key] = setting.value
      })

      settings.value = settingsObj
    } catch (e: any) {
      error.value = e.message || 'Error al cargar configuración del sitio'
      console.error('Error fetching site settings:', e)
    } finally {
      loading.value = false
    }
  }

  // Get a specific setting value
  function getSetting(key: string, defaultValue: any = null) {
    return settings.value[key] ?? defaultValue
  }

  // Get localized setting (for multilingual support)
  function getLocalizedSetting(key: string, locale: string = 'es', defaultValue: any = null) {
    const setting = settings.value[key]
    if (typeof setting === 'object' && setting !== null && locale in setting) {
      return setting[locale]
    }
    return setting ?? defaultValue
  }

  return {
    settings,
    loading,
    error,
    fetchSettings,
    getSetting,
    getLocalizedSetting,
  }
}
