import Room from '@/classes/room'
import { log, registerClass } from '@/utils'
import { store } from '@/store'

export default class IntroWinRoom extends Room {
  constructor(data) {
    super({
      ...data,
      name: 'Outside',
      icon: 'bx:bxs-landscape',
      x: 0,
      y: 1,
      img: 'intro-win.png'
    });
  }

  enter(fromRoom) {
    super.enter(fromRoom)
    log('Congratulations, you have won the game!!!')
    store.game.pause()
  }
}

registerClass(IntroWinRoom)
