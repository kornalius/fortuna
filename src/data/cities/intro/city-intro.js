import City from '@/classes/city'
import IntroBuilding from './buildings/intro'

export default class IntroCity extends City {
  constructor(data) {
    super({
      ...data,
      name: 'Introduction City',
      icon: 'bx:bxs-flag-checkered',
      x: 0,
      y: 0,
      img: 'intro-city.png',
      startBuildingName: 'Introduction Building',
    });
  }

  mounted() {
    super.mounted()

    this.addBuilding(new IntroBuilding())
  }
}
