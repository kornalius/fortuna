import { Entities } from '@/entities'
import { Log } from '@/classes/log'

export class Logs extends Entities {
  storeName = 'logs'

  get list(): Log[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Log | undefined { return id ? this.state[id] : undefined }
}
