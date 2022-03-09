import SimonSmithDialogs from './dialogs/SimonSmith'
import { npc } from '@/generators'

const n = npc({ old: true })

export default {
  name: 'Simon Smith',
  icon: 'emojione:old-man-medium-light-skin-tone',
  img: 'old-man2.png',
  description: `Simon Smith${n.description(false)}`,
  talkable: true,
  agenda: [
    { start: '00:00', end: '23:59', roomCode: 'TestRoom' },
    { date: store.config.startDate, start: '18:15', end: '18:29', roomCode: 'TestRoomWin' },
  ],

  mounted() {
    this.addDialog(SimonSmithDialogs.call(this))
  },
}
