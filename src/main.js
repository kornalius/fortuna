import { createApp } from 'vue'
import './store'
import './rooms'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import App from './App.vue'

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
