import Entities from '@/entities'
import City from '@/classes/city'

export default class Cities extends Entities {
  storeName = 'cities'
  model = City

  at(x, y) { return this.list.find(r => r.x === x && r.y === y) }
}
