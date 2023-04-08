import { Entities } from '@/entities'
import { City } from '@/classes/city'

export class Cities extends Entities {
  storeName = 'cities'

  get list(): City[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): City | undefined { return id ? this.state[id] : undefined }

  at(x: number, y: number): City | undefined {
    return this.list.find(r => r.x === x && r.y === y)
  }
}
