import { createApp } from 'vue'
import { customAlphabet } from 'nanoid'
import naive from 'naive-ui'
import anime from 'animejs'
import 'vfonts/FiraCode.css'
import { Icon } from '@iconify/vue'
import './store'
import App from './App.vue'

window.nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

anime.suspendWhenDocumentHidden = false

createApp(App)
  .use(naive)
  .component('v-icon', Icon)
  .mount('#app')
