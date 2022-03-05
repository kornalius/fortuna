import Entities from '@/entities'

export default class Npcs extends Entities {
  storeName = 'npcs'

  processAgendas() {
    this.list.forEach(n => {
      if (n.canMove()) {
        n.agenda.forEach(a => {
          const sd = [
            a.date || store.game.date,
            a.start || store.game.time,
          ].join(' ')

          const ed = [
            a.date || store.game.date,
            a.end || store.game.time,
          ].join(' ')

          // find the target room
          let room;
          if (a.roomId) {
            room = store.rooms.get(a.roomId)
          }
          if (a.roomCode) {
            room = store.rooms.findByCode(a.roomCode)
          }

          // check if actual date + time is within the time range specified by the agenda
          const isBetween = store.game.isBetween(sd, ed)
          if (isBetween && n.location !== room) {
            n.location = room
          }
        })
      }
    })
  }
}
