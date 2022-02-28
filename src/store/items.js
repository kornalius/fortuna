import Entities from '@/entities'
import Item from '@/classes/items/item'

export default class Items extends Entities {
  storeName = 'items'
  model = Item
}
