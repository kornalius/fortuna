import Room from '@/classes/room'
import TestRoom from './rooms/test'
import TestWinRoom from './rooms/test-win'

export default {
  name: 'Test Building',
  code: 'TestBuilding',
  x: 30,
  y: 445,
  startRoomCode: 'TestRoom',

  mounted() {
    this.addRoom([
      new Room(TestRoom),
      new Room(TestWinRoom),
    ])
  },
}
