import { color, icon, log, LOG_IMPORTANT, LOG_WARN } from '@/utils'
import { Server } from '@/classes/server/server'
import { LightSwitch } from '@/classes/items/electronic/light-switch'
import { Freeze } from '@/classes/battles/freeze'
import { Kick } from '@/classes/battles/kick'
import { Roll } from '@/classes/battles/roll'
import { BookShelf } from '@/classes/containers/bookshelf'
import { Npc } from '@/classes/npcs/npc'
import { Dialog } from '@/classes/dialog'
import { RandomNpc } from '@/classes/npcs/random-npc'
import { BaseballCap } from '@/classes/items/clothing/baseball-cap'
import { IRoomData, Room } from '@/classes/rooms/room'
import { Keypad } from '@/classes/items/keypad'
import { PillsBottle } from '@/classes/containers/pills-bottle'
import { File } from '@/classes/server/file'
import { Ftp } from '@/classes/softwares/ftp'
import { Viewer } from '@/classes/softwares/viewer'
import { Deleter } from '@/classes/softwares/deleter'
import { Cracker } from '@/classes/softwares/cracker'

export default {
  name: 'Test Room',
  code: 'TestRoom',
  icon: 'flag',
  x: 0,
  y: 0,
  img: 'test-room.png',

  mounted(this: Room): void {
    const npc = this.addNpc(new RandomNpc({
      name: 'Simon Smith',
      icon: 'emojione:old-man-medium-light-skin-tone',
      img: 'old-man2.png',
      talkable: true,
      agenda: [
        { start: '00:00', end: '23:59', roomCode: 'TestRoom' },
        { date: window.store.config.startDate, start: '18:15', end: '18:29', roomCode: 'TestRoomWin' },
      ],

      mounted(this: Npc): void {
        this.addDialog([
          {
            code: 'start',
            text: 'The old man, non chalantly, turns his head to look at you, ' +
              'as if you were just another passenger from his day dreaming. ' +
              '"What do you want? Make it quick I\'ve got places to be."' +
              'Places to be?, you think, this man is definately some lunatic...',
            answers: [{
              text: 'What is your name old man?',
              next: 'name',
              async say(this: Dialog): Promise<void> {
                await this.npc?.say('name')
              },
            }],
          },
          {
            code: 'name',
            text: 'He grimace like you were some kind of bug he was about to squash with his old boot. ' +
              '"My name is Simon Smith", he replies reluctantly.',
            async onSay(this: Dialog): Promise<void> {
              if (this.npc) {
                this.npc.known = true
              }
            }
          },
        ])
      },
    }))
    this.location?.addOwner(npc)

    this.addItem(new BookShelf())

    this.addItem(new LightSwitch({
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

          const { room } = window.store.game

          if (room) {
            const door = room.addDoor({ unlockable: false, locked: true,keypadCode: '1234', }, 'S')

            room.addItem(new Keypad({ doorId: door.id }))

            room.addItem(new PillsBottle({
              name: 'Bottle',

              async onPickup(this: PillsBottle): Promise<void> {
                log([
                  'You stash it in your pockets. You will need to investigate',
                  'this a little further down the road because you clearly don\'t remember being',
                  'prescribed pills',
                ])
              },

              async onExamine(this: PillsBottle): Promise<void> {
                if (!window.store.player.has(this)) {
                  log('You read the sticker on the bottle, it seems to belong to, YOU?', LOG_WARN, this.icon)
                } else {
                  log('A bottle of prescribed pills to your name', LOG_WARN, this.icon)
                }
              },
            }))
          }

          log([
            'While your eyes inspect the room, you look down and see a half empty bottle of pills',
            'is lying on the floor. Pills are dispersed on the floor near it.',
          ])
        }
      },
    }))

    this.addItem(new Server({
      name: 'Test server',
      crackable: true,
      protected: true,

      mounted(this: Server): void {
        this.addFile([
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
        ])

        window.store.player.addItem([
          new Ftp({ name: 'ZModem', deletable: true, installed: true, weight: 11 }),
          new Viewer({ name: 'Viewer', weight: 3 }),
          new Deleter({ name: 'Del', installed: true, weight: 1 }),
          new Cracker({ name: 'CrackerJack', installed: true, weight: 1 }),
        ])
      },
    }))
    this.addItem(new BaseballCap())
    this.addItem(new Freeze())
    this.addItem(new Kick())
    this.addItem(new Roll({
      tooltip() { return 'TOOLTIP TEST' },
    }))
  },

  async onEnter(this: Room): Promise<void> {
    if (this.firstVisit) {
      log(`${ icon('stars', 2) } Welcome to ${ color('red', 'Fortuna') } ${ icon('stars', 2) }`, LOG_IMPORTANT)
      log('A text adventure game, spiced up with elements of Roleplaying games.')
      log([
        `${ color('blue', 'This is the tutorial room.') }`,
        'You will need to get out of here by interacting with different items in the room.'
      ])
    }

    log([
      'It is very dark in here.',
      'You cannot quite see.',
      'You extend your hands in front of you and walk forward until you touch the wall, at least it feels like gypsum.',
      'You lounge the wall until your fingers touch a bump that feels like metal about the size of a credit card.',
    ])
  },
} as IRoomData
