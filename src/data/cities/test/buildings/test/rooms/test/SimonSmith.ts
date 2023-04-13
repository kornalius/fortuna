import { INpcData, Npc } from '@/classes/npcs/npc'
import { Dialog } from '@/classes/dialog'

export default {
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
} as INpcData
