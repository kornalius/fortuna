import { registerClass } from '@/utils'
import { Npc } from './npc'
import { SetupData } from '@/entity'

export class Janitor extends Npc {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Janitor',
      icon: 'janitor',
      ...(data || {})
    })
  }
}

registerClass(Janitor)
