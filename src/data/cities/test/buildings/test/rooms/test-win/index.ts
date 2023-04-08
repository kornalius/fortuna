import { log } from '@/utils'
import { Room } from '@/classes/rooms/room'

export default {
  name: 'Outside',
  icon: 'montains',
  code: 'TestRoomWin',
  x: 0,
  y: 1,
  img: 'test-win.png',

  async onEnter(): Promise<void> {
    log('Congratulations, you have won the game!!!')
    window.store.game.pause()
  },
} as Room
