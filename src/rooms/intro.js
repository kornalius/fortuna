import random from 'lodash/random'
import Room from '@/classes/room'
import Item from '@/classes/items/item'

export default () => {
  const room = new Room({
    name: 'Introduction Room',
    x: 0,
    y: 0,
  })

  const doors = [room.addDoor({ locked: true }, 'S')]

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
