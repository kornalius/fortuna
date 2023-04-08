import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Table } from './table'
import { SetupData } from '@/entity'

export class SmallTable extends Table {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Small table',
      icon: 'table-small',
      iconSuffix: random(1, 2),
      ...(data || {})
    })
  }
}

registerClass(SmallTable)
