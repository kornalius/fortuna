import { Entities } from '@/entities'
import { Item } from '@/classes/items/item'

export class Items extends Entities {
  storeName = 'items'

  get list(): Item[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Item | undefined { return id ? this.state[id] : undefined }
}
