import random from 'lodash/random'
import Table from './table'
import { registerClass } from '@/utils'

export default class SmallTable extends Table {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Small table',
      icon: 'table-small',
      iconSuffix: random(1, 2),
      ...data,
    })
  }
}

registerClass(SmallTable)
