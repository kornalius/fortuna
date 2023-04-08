import { Entities } from '@/entities'
import { Door } from '@/classes/items/furniture/door'

export class Doors extends Entities {
  storeName = 'doors'

  get list(): Door[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Door | undefined { return id ? this.state[id] : undefined }
}
