import Entities from '@/entities'
import Building from '@/classes/building'

export default class Buildings extends Entities {
  storeName = 'buildings'
  model = Building

  at(x, y) { return this.list.find(r => r.x === x && r.y === y) }
}
