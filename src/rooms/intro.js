import Room from '@/classes/room'
import { color, log } from '@/utils'

export default class IntroRoom extends Room {
  constructor(data) {
    super({
      ...data,
      name: 'Introduction Room',
      x: 0,
      y: 0,
      img: 'intro-room.png'
    });
  }

  mounted() {
    super.mounted()

    this.switch = this.addItem({ name: 'Switch', icon: 'heroicons-solid:light-bulb', qty: 1 })
  }

  enter(fromRoom) {
    super.enter(fromRoom)
    log(`Welcome to ${color('red', 'Fortuna')}`)
    log()
    log('A text adventure game, spiced up with elements of Roleplaying games.')
    log([
      `${color('blue', 'This is the tutorial room.')}`,
      'You will need to get out of here by interacting with different items in the room.'
    ])
    log([
      'It is very dark in here.',
      'You cannot quite see.',
      'You use extend your hands in front of you and walk forward until you touch the wall, at least it feels like gypsum.',
      'You lounge the wall until your fingers touch a bump that feels like metal about the size of a credit card.',
    ])
  }

  onAction(action) {
    super.onAction(action)
    if (action.key === 'examine' && action.target === this.switch) {
      this.addDoor({ locked: true }, 'S')
    }
  }
}
