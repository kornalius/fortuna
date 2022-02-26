import Entities from '@/entities'

export default class Cities extends Entities {
  storeName = 'cities'

  at(x, y) { return this.list.find(r => r.x === x && r.y === y) }
}
