import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const mode = ref<ThemeMode>('system')

    const isDark = computed(() => {
      if (typeof window === 'undefined') return false
      if (mode.value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return mode.value === 'dark'
    })

    function setTheme(newMode: ThemeMode): void {
      mode.value = newMode
      applyTheme()
    }

    function toggleTheme(): void {
      setTheme(isDark.value ? 'light' : 'dark')
    }

    function applyTheme(): void {
      if (typeof document === 'undefined') return
      const dark = isDark.value
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    }

    return {
      mode,
      isDark,
      setTheme,
      toggleTheme,
      applyTheme,
    }
  },
  {
    persist: true,
  },
)
