import SimonSmithDialogs from './dialogs/SimonSmith'
import { Npc } from '@/classes/npcs/npc'

export default {
  name: 'Simon Smith',
  icon: 'emojione:old-man-medium-light-skin-tone',
  img: 'old-man2.png',
  talkable: true,
  agenda: [
    { start: '00:00', end: '23:59', roomCode: 'TestRoom' },
    { date: window.store.config.startDate, start: '18:15', end: '18:29', roomCode: 'TestRoomWin' },
  ],

  mounted(): void {
    this.addDialog(SimonSmithDialogs.call(this))
  },
} as Npc