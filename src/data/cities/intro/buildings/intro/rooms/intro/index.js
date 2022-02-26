import Room from '@/classes/room'
import { color, log } from '@/utils'
import LightSwitch from '@/classes/items/lightSwitch'
import { IntroServer } from './servers'
import { store } from '@/store'

export default class IntroRoom extends Room {
  constructor(data) {
    super({
      ...data,
      name: 'Introduction Room',
      icon: 'bx:bxs-flag-checkered',
      x: 0,
      y: 0,
      img: 'intro-room.png',
    });
  }

  mounted() {
    super.mounted()

    this.addNpc({
      name: 'Simon Smith',
      icon: 'emojione:old-man-medium-light-skin-tone',
      img: 'old-man2.png',
      description: 'An old grumpy man',
      talkable: true,
      aggresive: true,

      mounted() {
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
              async say() { await this.npc.say('name') },
            }]
          },
          {
            code: 'name',
            text: 'He grimace like you were some kind of bug he was about to squash with his old boot. ' +
              '"My name is Simon Smith", he replies reluctantly.',
            async onSay() {
              this.npc.known = true
            }
          }
        ])
      }
    })

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

          store.game.room.addDoor({ locked: true }, 'S')

          store.game.room.addItem({
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
              if (!store.player.has(this)) {
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

    this.addItem(new IntroServer())
  }

  async onEnter() {
    await super.onEnter()

    if (this.firstVisit) {
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
