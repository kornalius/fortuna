import Room from '../classes/room';
import Door from '../classes/items/door';
import Item from '../classes/items/item';
import { store } from '../store';

const room = new Room({
  name: 'Introduction Room',
  x: 0,
  y: 0,
})
store.rooms.update(room)

const door = new Door({
  directions: {
    [room.id]: 'N',
  }
})
store.doors.update(door)

const items = new Array(Math.floor(Math.random() * 5) + 1).map(() => (
  new Item({
    qty: Math.floor(Math.random() * 20) + 1,
    locationId: room.id,
    locationStore: 'rooms',
  })
))
store.items.update(items)
