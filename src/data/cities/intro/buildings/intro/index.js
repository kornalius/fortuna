import Building from '@/classes/building'
import IntroRoom from './rooms/intro'
import IntroWinRoom from './rooms/intro-win'

export default class IntroBuilding extends Building {
  constructor(data) {
    super({
      ...data,
      name: 'Introduction Building',
      icon: 'bx:bxs-flag-checkered',
      x: 0,
      y: 0,
      img: 'intro-building.png',
      startRoomName: 'Introduction Room',
    });
  }

  mounted() {
    super.mounted()

    this.addRoom(new IntroRoom())
    this.addRoom(new IntroWinRoom())
  }
}
