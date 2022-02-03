import Room from '../classes/room';
import Item from '../classes/items/item';
import { newDoor } from '../utils';

export default () => {
  const room = new Room({
    name: 'Introduction Room',
    x: 0,
    y: 0,
  })

  const doors = [newDoor({}, room, 'S')]

  const items = Array(Math.floor(Math.random() * 5) + 1).fill(0).map(() => (
    new Item({
      qty: Math.floor(Math.random() * 20) + 1,
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
