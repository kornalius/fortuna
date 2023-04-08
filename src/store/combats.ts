import { Entities } from '@/entities'
import { Combat } from '@/classes/combat'

export class Combats extends Entities {
  storeName = 'combats'

  get list(): Combat[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Combat | undefined { return id ? this.state[id] : undefined }
}
