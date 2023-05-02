import { Entities } from '@/entities'
import { Npc } from '@/classes/npcs/npc'

export class Npcs extends Entities {
  storeName = 'npcs'

  get list(): Npc[] { return Object.keys(this.state).map(k => this.state[k]) }

  get(id?: string | null): Npc | undefined { return id ? this.state[id] : undefined }

  async processAgendas(): Promise<void> {
    const { game, rooms } = window.store
    await Promise.all(
      this.list.map(async n => {
        if (n.canMove()) {
          await Promise.all(
            n.agenda.map(async a => {
              const sd = [
                a.date || game.date,
                a.start || game.time,
              ].join(' ')

              const ed = [
                a.date || game.date,
                a.end || game.time,
              ].join(' ')

              // find the target room
              let room
              if (a.roomId) {
                room = rooms.get(a.roomId)
              }
              if (a.roomCode) {
                room = rooms.findByCode(a.roomCode)
              }

              // check if actual date + time is within the time range specified by the agenda
              const isBetween = game.isBetween(sd, ed)
              if (isBetween && n.location !== room) {
                n.location = room
              } else if (a.expr) {
                const t = [
                  game.date,
                  game.time,
                ].join(' ')

                if (isBetween && (t === sd || t === ed)) {
                  // execute an expression at start or at end
                  await a.expr(n, t === ed)
                }
              }
            })
          )
        }
      })
    )
  }
}
