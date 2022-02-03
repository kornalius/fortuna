import Entities from '../entities'

export default class Rooms extends Entities {
  storeName = 'rooms'

  at(x, y) { return this.list.find(r => r.x === x && r.y === y) }
}
