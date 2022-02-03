import Room from '../classes/room'
import Item from '../classes/items/item'
import { newDoor } from '../utils'
import random from 'lodash/random'

export default () => {
  const room = new Room({
    name: 'Introduction Room',
    x: 0,
    y: 0,
  })

  const doors = [newDoor({}, room, 'S')]

  const items = Array(random(5)).fill(0).map(() => (
    new Item({
      qty: random(20),
      locationId: room.id,
      locationStore: 'rooms',
    })
  ))

  return {
    room,
    doors,
    items,
  }
}
