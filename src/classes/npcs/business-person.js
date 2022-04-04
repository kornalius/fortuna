import random from 'lodash/random'
import Npc from './npc'
import { registerClass } from '@/utils'

export default class BusinessPerson extends Npc {
  setupInstance(data) {
    return super.setupInstance({
      name: 'BusinessPerson',
      icon: 'business',
      female: !!random(0, 1),
      ...data,
    })
  }
}

registerClass(BusinessPerson)
