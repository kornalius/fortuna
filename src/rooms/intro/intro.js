import Room from '@/classes/room'
import { color, log } from '@/utils'
import LightSwitch from '@/classes/items/lightSwitch'
import Server from '@/classes/items/server'
import File from '@/classes/items/file'
import FTP from '@/classes/softwares/ftp'
import Viewer from '@/classes/softwares/viewer'
import Deleter from '@/classes/softwares/deleter'

class IntroServer extends Server {
  mounted() {
    super.mounted()

    const { player } = store

    this.addItem([
      new File({
        name: 'Plots.txt',
        version: 1,
        downloadable: true,
        uploadable: true,
        weight: 2,
        content: 'Some sexy plot for a cool project!',
      }),
      new File({
        name: 'Email (from shawn@gmail.com).txt',
        version: 1,
        weight: 4,
        downloadable: true,
        content: [
          'Date: Fri, Oct 11',
          'From: shawn@gmail.com',
          'To: bob@gmail.com',
          'Subject: Important, please answer quick',
          '---------------------------------------',
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

    player.addItem([
      new FTP({
        name: 'ZModem',
        deletable: true,
        equipped: true,
        weight: 11,
      }),
      new Viewer({
        name: 'Viewer',
        weight: 3,
      }),
      new Deleter({
        name: 'Del',
        equipped: true,
        weight: 1,
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

    const { game, player } = store

    this.addItem(new LightSwitch({
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
          game.room.addDoor({ locked: true }, 'S')
          game.room.addItem({
            name: 'Bottle',
            icon: 'fa-solid:prescription-bottle-alt',
            qty: 1,
            onPickup() {
              log([
                'You stash it in your pockets. You will need to investigate',
                'this a little further down the road because you clearly don\'t remember being',
                'prescribed pills',
              ])
            },
            onExamine() {
              if (!player.has(this)) {
                log('You read the sticker on the bottle, it seems to belong to, YOU?')
              } else {
                log('A bottle of prescribed pills to your name')
              }
            }
          })
          log([
            'While your eyes inspect the room, you look down and see a half empty bottle of pills',
            'is lying on the floor. Pills are dispersed on the floor near it.',
          ])
        }
      },
    }))
    this.server = this.addItem(new IntroServer())
  }

  async onEnter() {
    await super.onEnter()

    if (this.visited === 1) {
      log(`Welcome to ${ color('red', 'Fortuna') }`, 1)
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
  }
}
