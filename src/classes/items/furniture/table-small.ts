import random from 'lodash/random'
import { registerClass } from '@/utils'
import { Table, ITableData } from './table'
import { SetupData } from '@/entity'

export class SmallTable extends Table {
  setupInstance(data?: ITableData): SetupData | undefined {
    return super.setupInstance({
      name: 'Small table',
      icon: 'table-small',
      iconSuffix: random(1, 2).toString(),
      ...(data || {})
    })
  }
}

registerClass(SmallTable)
