import Config from './config'
import Player from './player'
import Items from './items'
import Doors from './doors'
import Rooms from './rooms'
import Npcs from './npcs'
import Dialogs from './dialogs'
import Logs from './logs'
import Game from './game'

export const models = {
  config: Config,
  player: Player,
  items: Items,
  doors: Doors,
  rooms: Rooms,
  npcs: Npcs,
  dialogs: Dialogs,
  logs: Logs,
  game: Game,
}

export const store = {}

Object.keys(models).forEach(k => {
  store[k] = new models[k]()
})

window.store = store
