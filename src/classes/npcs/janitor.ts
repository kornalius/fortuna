import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Janitor extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'Janitor',
      icon: 'janitor',
      ...(data || {})
    })
  }
}

registerClass(Janitor)
