export interface SoundFile {
  src: string
  volume?: number
  loop?: boolean
}

export const soundFiles: { [key: string]: SoundFile } = {
  // Musics
  'test-music': { src: 'music/test-music.mp3' },

  // UI
  'button': { src: 'sfx/button.wav', volume: 0.5 },
  'click': { src: 'sfx/click.wav' },
  'success': { src: 'sfx/success.wav' },

  // Doors
  'unlock': { src: 'sfx/unlock.wav' },
  'open-door': { src: 'sfx/open-door.wav' },
  'close-door': { src: 'sfx/close-door.wav' },

  // Drawers
  'open-drawer': { src: 'sfx/open-drawer.wav' },
  'close-drawer': { src: 'sfx/close-drawer.wav' },

  // Pills Bottle
  'open-pills-bottle': { src: 'sfx/open-pills-bottle.wav'},
  'search-pills-bottle': { src: 'sfx/search-pills-bottle.wav'},

  // Boxes
  'box-carton-open': { src: 'sfx/box-carton-open.wav' },
  'box-wood-destroy': { src: 'sfx/box-wood-destroy.wav' },
  'box-wood-open': { src: 'sfx/box-wood-open.wav' },

  // Windows
  'open-window': { src: 'sfx/open-window.wav' },
  'close-window': { src: 'sfx/close-window.wav' },

  // Switches
  'switch': { src: 'sfx/switch.wav' },
  'keypad': { src: 'sfx/keypad.wav' },
  'error_keypad': { src: 'sfx/error_keypad.wav' },

  // Computer + Server
  'boot-sound': { src: 'sfx/boot-sound.wav' },
  'keyboard': { src: 'sfx/keyboard.wav', loop: true },
  'hd': { src: 'sfx/hd.wav', loop: true },
  'hd2': { src: 'sfx/hd2.wav', loop: true },
  'hum': { src: 'sfx/hum.wav', loop: true, volume: 0.5 },
  'print': { src: 'sfx/transmission.wav' },
  'power-down': { src: 'sfx/power-down.wav' },

  // Dice
  'dice-roll': { src: 'sfx/dice-roll.wav' },

  // Hits
  'hit': { src: 'sfx/hit.wav' },
  'swing': { src: 'sfx/swing.wav' },
  'sword-hit': { src: 'sfx/sword-hit.wav' },
  'pole-hit': { src: 'sfx/pole-hit.wav' },
  'metal-hit': { src: 'sfx/metal-hit.wav' },

  // Bombs
  'bomb': { src: 'sfx/bomb.wav' },

  // Water
  'water-swirl': { src: 'sfx/water-swirl.wav' },

  // Fight and Powers
  'upgrade': { src: 'sfx/upgrade.wav' },
  'kick': { src: 'sfx/kick.wav' },
  'punch': { src: 'sfx/punch.wav' },
  'freeze': { src: 'sfx/freeze.wav' },
  'slurp': { src: 'sfx/slurp.wav' },
  'knife': { src: 'sfx/knife.wav' },
  'gun': { src: 'sfx/gun.wav' },
  'sparkle': { src: 'sfx/sparkle.wav' },
  'tape': { src: 'sfx/tape.wav' },
  'shock': { src: 'sfx/shock.wav' },
  'shields-up': { src: 'sfx/shields-up.wav' },
  'shields-up-2': { src: 'sfx/shields-up-2.wav' },
  'power-up': { src: 'sfx/power-up.wav' },
  'power-up-2': { src: 'sfx/power-up-2.wav' },
  'power-up-3': { src: 'sfx/power-up.w-3av' },
  'power-up-4': { src: 'sfx/power-up.wav-4' },
  'defibrilator': { src: 'sfx/defibrilator.wav' },
  'charge-up': { src: 'sfx/charge-up.wav' },
  'buff': { src: 'sfx/buff.wav' },
  'buff-2': { src: 'sfx/buff-2.wav' },
  'buff-3': { src: 'sfx/buff-3.wav' },
  'swoop-up': { src: 'sfx/swoop-up.wav' },
  'choir': { src: 'sfx/choir.wav' },
  'handcuffs': { src: 'sfx/handcuffs.wav' },
  'arrow': { src: 'sfx/arrow.wav' },
  'break': { src: 'sfx/break.wav' },
  'wobble-up': { src: 'sfx/wobble-up.wav' },
  'wobble-down': { src: 'sfx/wobble-down.wav' },
  'explosion': { src: 'sfx/explosion.wav' },

  // Human
  'walk': { src: 'sfx/walk.wav' },
  'anger': { src: 'sfx/anger.wav' },
  'breath': { src: 'sfx/breath.wav' },
  'breath-2': { src: 'sfx/breath-2.wav' },
  'breath-3': { src: 'sfx/breath-3.wav' },
  'grunt': { src: 'sfx/grunt.wav' },
  'grunt-2': { src: 'sfx/grunt-2.wav' },
  'grunt-3': { src: 'sfx/grunt-3.wav' },
  'grunt-4': { src: 'sfx/grunt-4.wav' },
  'heartbeat': { src: 'sfx/heartbeat.wav' },
  'pain': { src: 'sfx/pain.wav' },
  'scream': { src: 'sfx/scream.wav' },
  'eat': { src: 'sfx/eat.wav' },
  'drink': { src: 'sfx/drink.wav' },
  'equip': { src: 'sfx/equip.wav' },
  'pickup': { src: 'sfx/pickup.wav' },
  'drop': { src: 'sfx/drop.wav' },

  // Furnitures
  'piano': { src: 'sfx/piano.wav' },
  'sink': { src: 'sfx/sink.wav' },
  'radio': { src: 'sfx/radio.wav' },
  'hifi': { src: 'sfx/hifi.wav' },
  'call-bell': { src: 'sfx/call-bell.wav' },
  'fireplace': { src: 'sfx/fireplace.wav' },
}
