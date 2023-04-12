import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Table, ITableSetupData } from './table'
import { SetupData } from '@/entity'

export class SmallTable extends Table {
  setupInstance(data?: ITableSetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Small table',
      icon: 'table-small',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(SmallTable)
