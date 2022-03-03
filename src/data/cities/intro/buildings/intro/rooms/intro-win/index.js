import { log } from '@/utils'
import { store } from '@/store'

export default {
  name: 'Outside',
  icon: 'bx:bxs-landscape',
  x: 0,
  y: 1,
  img: 'intro-win.png',

  onEnter(fromRoom) {
    log('Congratulations, you have won the game!!!')
    store.game.pause()
  },
}
