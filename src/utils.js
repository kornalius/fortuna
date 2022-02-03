import { store } from './store';
import Log from './classes/log';
import Door from './classes/items/door';

export const log = (message, target) => {
  store.logs.update(new Log({ message, target }))
}

export const loadRoom = (f) => {
  const { room, items, doors } = f()
  if (room) {
    store.rooms.update(room)
  }
  if (doors) {
    store.doors.update(doors)
  }
  if (items) {
    store.items.update(items)
  }
}

export const newDoor = (data, room, direction) => {
  const directions = {
    [room.id]: direction
  }

  let r
  switch (direction) {
    case 'N':
      r = store.rooms.at(room.x, room.y - 1)
      if (r) {
        directions[r.id] = 'S'
      }
      break
    case 'S':
      r = store.rooms.at(room.x, room.y + 1)
      if (r) {
        directions[r.id] = 'N'
      }
      break
    case 'W':
      r = store.rooms.at(room.x - 1, room.y)
      if (r) {
        directions[r.id] = 'E'
      }
      break
    case 'E':
      r = store.rooms.at(room.x + 1, room.y)
      if (r) {
        directions[r.id] = 'W'
      }
      break
    default:
  }

  return new Door({
    ...data,
    directions,
  })
}
