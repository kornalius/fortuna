import Entities from '@/entities'
import Log from '@/classes/log'

export default class Logs extends Entities {
  storeName = 'logs'
  model = Log
}
