import { log } from '@/utils'

export default {
  name: 'Outside',
  icon: 'montains',
  code: 'TestRoomWin',
  x: 0,
  y: 1,
  img: 'test-win.png',

  async onEnter() {
    log('Congratulations, you have won the game!!!')
    window.store.game.pause()
  },
}
