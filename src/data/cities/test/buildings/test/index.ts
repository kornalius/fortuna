import { IRoomSetupData, Room } from '@/classes/rooms/room'
import { RandomLivingRoom } from '@/classes/rooms/random-livingroom'
import { Building } from '@/classes/buildings/building'
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
      new RandomLivingRoom(TestRoom as unknown as IRoomSetupData),
      new Room(TestWinRoom as unknown as IRoomSetupData),
    ])
  },
} as Building
