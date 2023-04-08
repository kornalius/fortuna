import { Building } from '@/classes/buildings/building'
import { City } from '@/classes/city'
import TestBuilding from './buildings/test'

export default {
  name: 'Test City',
  code: 'TestCity',
  x: 330,
  y: 380,
  startBuildingCode: 'TestBuilding',
  img: 'test-city.png',

  mounted() {
    this.addBuilding(new Building(TestBuilding))
  },
} as City
