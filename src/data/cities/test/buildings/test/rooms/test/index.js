import { color, log, LOG_IMPORTANT } from '@/utils'
import Server from '@/classes/server/server'
import TestRoomServer from './servers'
import Npc from '@/classes/npcs/npc'
import LightSwitch from '@/classes/items/lightSwitch'
import TestRoomLightSwitch from './items/light-switch'
import SimonSmith from './npcs/SimonSmith'
import Freeze from '@/classes/battles/freeze'
import Kick from '@/classes/battles/kick'
import Roll from '@/classes/battles/roll'
import BookShelf from '@/classes/containers/bookshelf'

export default {
  name: 'Test Room',
  code: 'TestRoom',
  icon: 'flag',
  x: 0,
  y: 0,
  img: 'test-room.png',

  mounted() {
    const npc = this.addNpc(new Npc(SimonSmith))
    this.location.addOwner(npc)
    this.addItem(new BookShelf())
    this.addItem(new LightSwitch(TestRoomLightSwitch))
    this.addItem(new Server(TestRoomServer))
    this.addItem(new Freeze())
    this.addItem(new Kick())
    this.addItem(new Roll())
  },

  async onEnter() {
    if (this.firstVisit) {
      log(`Welcome to ${ color('red', 'Fortuna') }`, LOG_IMPORTANT)
      log('A text adventure game, spiced up with elements of Roleplaying games.')
      log([
        `${ color('blue', 'This is the tutorial room.') }`,
        'You will need to get out of here by interacting with different items in the room.'
      ])
    }

    log([
      'It is very dark in here.',
      'You cannot quite see.',
      'You use extend your hands in front of you and walk forward until you touch the wall, at least it feels like gypsum.',
      'You lounge the wall until your fingers touch a bump that feels like metal about the size of a credit card.',
    ])
  },
}
