import random from 'lodash/random'
import Room from '@/classes/room'
import { log } from '@/utils'

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

    this.addDoor({ locked: true }, 'S')

    this.addItem({ qty: random(20) })
  }

  enter(fromRoom) {
    super.enter(fromRoom)
    log('Welcome to Fortuna')
    log('A text adventure game, spiced up with elements of Roleplaying games.')
    log([
      'This is the tutorial room.',
      'You will need to get out of here by interacting with different items in the room.'
    ])
    log([
      'It is very dark in here.',
      'You cannot quite see.',
      'You use extend your hands in front of you and walk forward until you touch the wall, at least it feels like gypsum.',
      'You lounge the wall until your fingers touch a bump that feels like metal about the size of a credit card.',
    ])
  }
}
