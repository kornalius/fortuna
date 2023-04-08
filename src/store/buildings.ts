import { Entities } from '@/entities'
import { Npc } from '@/classes/npcs/npc'
import { Building } from '@/classes/buildings/building'

export class Buildings extends Entities {
  storeName = 'buildings'

  get list(): Building[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Building | undefined { return id ? this.state[id] : undefined }

  // returns a list of buildings owner by the npc
  ownedByNpc(npc: Npc): Building[] {
    return this.list.filter(building => building.owners.includes(npc))
  }
}
