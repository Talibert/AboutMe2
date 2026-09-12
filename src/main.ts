import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useThemeStore } from './stores/theme'

const app = createApp(App)

app.use(pinia)
app.use(router)

// Inicializa o tema salvo ou do sistema
const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')
