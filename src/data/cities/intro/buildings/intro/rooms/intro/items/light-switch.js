import { log } from '@/utils'
import PillsBottle from '@/classes/containers/pills-bottle'
import IntroRoomPillsBottle from './pills-bottle'
import { store } from '@/store'

export default {
  usable: false,

  onExamine() {
    if (this.isOff) {
      log('You feel the switch and concludes it is a normal switch with nothing special about it')
      this.usable = true
    }
  },

  onUse() {
    if (this.isOff) {
      this.isOn = true

      log([
        'The room becomes lit, you are blinded by the sudden switch from darkness to light.',
        'Your eyes take some time to adjust and you can now see the room in all it\'s glory.',
      ])

      store.game.room.addDoor({ locked: true }, 'S')
      store.game.room.addItem(new PillsBottle(IntroRoomPillsBottle))

      log([
        'While your eyes inspect the room, you look down and see a half empty bottle of pills',
        'is lying on the floor. Pills are dispersed on the floor near it.',
      ])
    }
  },
}
