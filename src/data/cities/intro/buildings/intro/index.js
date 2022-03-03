import Room from '@/classes/room'
import IntroRoom from './rooms/intro'
import IntroWinRoom from './rooms/intro-win'

export default {
  name: 'Introduction Building',
  code: 'IntroBuilding',
  x: 30,
  y: 445,
  startRoomCode: 'IntroRoom',

  mounted() {
    this.addRoom([
      new Room(IntroRoom),
      new Room(IntroWinRoom),
    ])
  },
}
