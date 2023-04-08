import { createApp } from 'vue'
import { customAlphabet } from 'nanoid'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import naive from 'naive-ui'
import anime from 'animejs'
import 'vfonts/FiraCode.css'
import './store'
import App from './App.vue'
import Icon from '@/components/Icon.vue'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

declare global {
  interface Window {
    nanoid: (size?: (number | undefined)) => string
  }
}

window.nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

// @ts-ignore
anime.suspendWhenDocumentHidden = false

createApp(App)
  .use(naive)
  .component('icon', Icon)
  .mount('#app')
