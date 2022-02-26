import Entities from '@/entities'

export default class Buildings extends Entities {
  storeName = 'buildings'

  at(x, y) { return this.list.find(r => r.x === x && r.y === y) }
}
