import { createApp } from 'vue'
import naive from 'naive-ui'
import 'vfonts/FiraCode.css'
import { Icon } from '@iconify/vue'
import './store'
import './rooms'
import App from './App.vue'

createApp(App)
  .use(naive)
  .component('v-icon', Icon)
  .mount('#app')
