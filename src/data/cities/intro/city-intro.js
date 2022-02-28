import City from '@/classes/city'
import IntroBuilding from './buildings/intro'
import { registerClass } from '@/utils'

export default class IntroCity extends City {
  constructor(data) {
    super({
      ...data,
      name: 'Introduction City',
      x: 330,
      y: 380,
      startBuildingName: 'Introduction Building',
      img: 'intro-city.png',
    });
  }

  mounted() {
    super.mounted()

    this.addBuilding(new IntroBuilding())
  }
}

registerClass(IntroCity)
