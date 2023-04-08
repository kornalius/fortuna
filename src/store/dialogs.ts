import { Entities } from '@/entities'
import { Dialog } from '@/classes/dialog'

export class Dialogs extends Entities {
  storeName = 'dialogs'

  get list(): Dialog[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Dialog | undefined { return id ? this.state[id] : undefined }
}
