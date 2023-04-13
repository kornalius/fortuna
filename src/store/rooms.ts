import { Entities } from '@/entities'
import { Room } from '@/classes/rooms/room'
import { Npc } from '@/classes/npcs/npc'

export class Rooms extends Entities {
  storeName = 'rooms'

  get list(): Room[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Room | undefined { return id ? this.state[id] : undefined }

  at(x: number, y: number): Room | undefined {
    return this.list.find(r => r.x === x && r.y === y)
  }

  // returns a list of rooms owned by the npc
  ownedByNpc(npc: Npc): Room[] {
    return this.list.filter(room => room.owners.includes(npc))
  }
}
