import Entities from '@/entities'

export default class Buildings extends Entities {
  storeName = 'buildings'

  // returns a list of buildings owner by the npc
  ownedByNpc(npc) {
    let n = npc
    if (typeof npc === 'string') {
      n = this.get(npc)
    }
    return this.list.filter(building => building.owners.includes(n))
  }
}
