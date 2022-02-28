import Building from '@/classes/building'
import IntroRoom from './rooms/intro'
import IntroWinRoom from './rooms/intro-win'
import { registerClass } from '@/utils'

export default class IntroBuilding extends Building {
  constructor(data) {
    super({
      ...data,
      name: 'Introduction Building',
      x: 20,
      y: 465,
      startRoomName: 'Introduction Room',
    });
  }

  mounted() {
    super.mounted()

    this.addRoom([
      new IntroRoom(),
      new IntroWinRoom(),
    ])
  }
}

registerClass(IntroBuilding)
