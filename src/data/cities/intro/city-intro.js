import Building from '@/classes/buildings/building'
import IntroBuilding from './buildings/intro'

export default {
  name: 'Introduction City',
  code: 'IntroCity',
  x: 330,
  y: 380,
  startBuildingCode: 'IntroBuilding',
  img: 'intro-city.png',

  mounted() {
    this.addBuilding(new Building(IntroBuilding))
  },
}
