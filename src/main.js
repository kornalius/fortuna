import { createApp } from 'vue'
import { customAlphabet } from 'nanoid'
import naive from 'naive-ui'
import anime from 'animejs'
import 'vfonts/FiraCode.css'
import './store'
import App from './App.vue'
import Icon from '@/components/Icon.vue'

window.nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

anime.suspendWhenDocumentHidden = false

createApp(App)
  .use(naive)
  .component('icon', Icon)
  .mount('#app')
