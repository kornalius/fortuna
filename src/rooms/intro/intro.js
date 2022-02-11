import Room from '@/classes/room'
import { color, log } from '@/utils'
import LightSwitch from '@/classes/items/lightSwitch'
import Server from '@/classes/items/server'
import File from '@/classes/items/file'
import Connector from '@/classes/softwares/connector'
import Scanner from '@/classes/softwares/scanner'
import Downloader from '@/classes/softwares/downloader'

class IntroServer extends Server {
  mounted() {
    super.mounted()

    this.addItem([
      new File({
        name: 'Plots.txt',
        version: 1,
        weight: 10,
        content: 'Some sexy plot for a cool project!',
      }),
      new File({
        name: 'Email (from shawn@gmail.com).txt',
        version: 1,
        weight: 20,
        content: [
          'Bob, there is something I\'d like to discuss with you!',
          '',
          'Regards,',
          'Shawn'
        ].join('\n'),
      }),
      new File({
        name: 'Image #1.img',
        version: 1,
        weight: 32,
        type: 'img',
      }),
      new File({
        name: 'Image #2.img',
        version: 1,
        weight: 64,
        type: 'img',
      }),
      new File({
        name: 'Image #3.img',
        version: 1,
        weight: 64,
        type: 'img',
      }),
      new File({
        name: 'Image #4.img',
        version: 1,
        weight: 64,
        type: 'img',
      }),
    ])

    store.player.addItem([
      new Scanner({
        name: 'The Scanner',
        deletable: false,
        equipped: true,
        weight: 12,
      }),
      new Connector({
        name: 'The Connector',
        deletable: false,
        equipped: true,
        weight: 16,
      }),
      new Downloader({
        name: 'The Downloader',
        deletable: false,
        equipped: true,
        weight: 11,
      }),
    ])
  }

  async onConnect() {
    await super.onConnect()

    this.print('Welcome to this nice amazing super cool server')
    this.print()
    this.print(['This', 'is', 'a', 'line'])
    this.print('Another line')
  }
}

export default class IntroRoom extends Room {
  constructor(data) {
    super({
      ...data,
      name: 'Introduction Room',
      icon: 'bx:bxs-flag-checkered',
      x: 0,
      y: 0,
      img: 'intro-room.png'
    });
  }

  mounted() {
    super.mounted()

    this.switch = this.addItem(new LightSwitch({ usable: false }))
    this.server = this.addItem(new IntroServer())
  }

  async onEnter() {
    await super.onEnter()

    if (this.visited === 1) {
      log(`Welcome to ${color('red', 'Fortuna')}`, 1)
      log('A text adventure game, spiced up with elements of Roleplaying games.')
      log([
        `${color('blue', 'This is the tutorial room.')}`,
        'You will need to get out of here by interacting with different items in the room.'
      ])
    }
    log([
      'It is very dark in here.',
      'You cannot quite see.',
      'You use extend your hands in front of you and walk forward until you touch the wall, at least it feels like gypsum.',
      'You lounge the wall until your fingers touch a bump that feels like metal about the size of a credit card.',
    ])
  }

  async onExamine(item) {
    if (item === this.switch && item.isOff) {
      log('You feel the switch and concludes it is a normal switch with nothing special about it')
      this.switch.usable = true
    } else if (item === this.bottle) {
      if (!store.player.has(this.bottle)) {
        log('You read the sticker on the bottle, it seems to belong to, YOU?')
      } else {
        log('A bottle of prescribed pills to your name')
      }
    }
  }

  async onUse(item) {
    if (item === this.switch && item.isOff) {
      item.isOn = true
      log([
        'The room becomes lit, you are blinded by the sudden switch from darkness to light.',
        'Your eyes take some time to adjust and you can now see the room in all it\'s glory.',
      ])
      this.addDoor({ locked: true }, 'S')
      this.bottle = this.addItem({
        name: 'Bottle',
        icon: 'fa-solid:prescription-bottle-alt',
        qty: 1,
      })
      log([
        'While your eyes inspect the room, you look down and see a half empty bottle of pills',
        'is lying on the floor. Pills are dispersed on the floor near it.',
      ])
    }
  }

  async onPickup(item) {
    if (item === this.bottle) {
      log([
        'You pickup the bottle and stash it in your pockets. You will need to investigate',
        'this a little further down the road because you clearly don\'t remember being',
        'prescribed pills',
      ])
    }
  }
}
