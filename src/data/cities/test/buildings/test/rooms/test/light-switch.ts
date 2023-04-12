import { log } from '@/utils'
import TestRoomPillsBottle from './pills-bottle'
import { PillsBottle } from '@/classes/containers/pills-bottle'
import { Keypad } from '@/classes/items/keypad'
import { LightSwitch } from '@/classes/items/electronic/light-switch'
import { IElectronicData } from '@/classes/items/electronic/electronic'

export default {
  usable: false,

  mounted(this: LightSwitch): void {
    this.state.done = false
  },

  async onExamine(this: LightSwitch): Promise<void> {
    if (this.isOff) {
      log('You feel the switch and concludes it is a normal switch with nothing special about it')
      this.usable = true
    }
  },

  async onUse(this: LightSwitch): Promise<void> {
    if (this.isOn && !this.state.done) {
      this.state.done = true

      log([
        'The room becomes lit, you are blinded by the sudden switch from darkness to light.',
        'Your eyes take some time to adjust and you can now see the room in all it\'s glory.',
      ])

      if (window.store.game.room) {
        const door = window.store.game.room.addDoor({
          unlockable: false,
          locked: true,
          keypadCode: '1234',
        }, 'S')
        window.store.game.room.addItem(new Keypad({ doorId: door.id }))
        window.store.game.room.addItem(new PillsBottle(TestRoomPillsBottle))
      }

      log([
        'While your eyes inspect the room, you look down and see a half empty bottle of pills',
        'is lying on the floor. Pills are dispersed on the floor near it.',
      ])
    }
  },
} as IElectronicData
