import { Entities } from '@/entities'
import { Room } from '@/classes/rooms/room'

export class Rooms extends Entities {
  storeName = 'rooms'

  get list(): Room[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Room | undefined { return id ? this.state[id] : undefined }

  at(x: number, y: number): Room | undefined {
    return this.list.find(r => r.x === x && r.y === y)
  }
}
