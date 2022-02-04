import Config from './config'
import Player from './player'
import Items from './items'
import Doors from './doors'
import Rooms from './rooms'
import Relations from './relations'
import Npcs from './npcs'
import Logs from './logs'
import Game from './game'

export const models = {
  config: Config,
  player: Player,
  items: Items,
  doors: Doors,
  rooms: Rooms,
  relations: Relations,
  npcs: Npcs,
  logs: Logs,
  game: Game,
}

export const store = {}

Object.keys(models).forEach(k => {
  store[k] = new models[k]()
})
