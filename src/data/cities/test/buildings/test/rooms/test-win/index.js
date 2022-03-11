import { log } from '@/utils'
import { store } from '@/store'

export default {
  name: 'Outside',
  icon: 'outside',
  code: 'TestRoomWin',
  x: 0,
  y: 1,
  img: 'test-win.png',

  onEnter(fromRoom) {
    log('Congratulations, you have won the game!!!')
    store.game.pause()
  },
}
