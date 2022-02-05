import random from 'lodash/random'
import Room from '@/classes/room'

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
    this.addDoor({ locked: true }, 'S')

    Array(random(5)).fill(0).forEach(() => this.addItem({ qty: random(20) }))
  }
}
