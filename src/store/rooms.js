import Entities from '@/entities'
import Room from '@/classes/room'

export default class Rooms extends Entities {
  storeName = 'rooms'
  model = Room

  at(x, y) { return this.list.find(r => r.x === x && r.y === y) }
}
