import { log } from '@/utils'
import PillsBottle from '@/classes/containers/pills-bottle'
import Keypad from '@/classes/items/keypad'
import TestRoomPillsBottle from './pills-bottle'
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

      const door = store.game.room.addDoor({
        unlockable: false,
        locked: true,
        keypadCode: '1234',
      }, 'S')
      store.game.room.addItem(new Keypad({ doorId: door.id }))
      store.game.room.addItem(new PillsBottle(TestRoomPillsBottle))

      log([
        'While your eyes inspect the room, you look down and see a half empty bottle of pills',
        'is lying on the floor. Pills are dispersed on the floor near it.',
      ])
    }
  },
}
