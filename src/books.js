export default [
  {
    name: 'Bound for Evil',
    requirements: [ { actionName: 'use', int: 1 } ],
    async onUse() {
      store.player.xp += 100
    },
  },
  {
    name: 'Fatal Duty',
    requirements: [ { actionName: 'use', int: 1 } ],
    async onUse() {
      store.player.xp += 100
    },
  },
  {
    name: 'Caged Angel',
    requirements: [ { actionName: 'use', int: 1 } ],
    async onUse() {
      store.player.xp += 100
    },
  },
  {
    name: 'Tower and the Sickle',
    requirements: [ { actionName: 'use', int: 1 } ],
    async onUse() {
      store.player.xp += 100
    },
  },
  {
    name: 'The man in the City',
    requirements: [ { actionName: 'use', int: 2 } ],
    async onUse() {
      store.player.xp += 200
    },
  },
  {
    name: 'Black Trap',
    requirements: [ { actionName: 'use', int: 2 } ],
    async onUse() {
      store.player.xp += 200
    },
  },
  {
    name: 'The Prophecy in the Mist',
    requirements: [ { actionName: 'use', int: 2 } ],
    async onUse() {
      store.player.xp += 200
    },
  },
  {
    name: 'Death of the Winged Beast',
    requirements: [ { actionName: 'use', int: 2 } ],
    async onUse() {
      store.player.xp += 200
    },
  },
  {
    name: 'Trap the Past',
    requirements: [ { actionName: 'use', int: 2 } ],
    async onUse() {
      store.player.xp += 200
    },
  },
  {
    name: 'Mark of Fire',
    requirements: [ { actionName: 'use', int: 3 } ],
    async onUse() {
      store.player.xp += 300
    },
  },
  {
    name: 'The Buried Clock',
    requirements: [ { actionName: 'use', int: 3 } ],
    async onUse() {
      store.player.xp += 300
    },
  },
  {
    name: 'Death of the Sacred Jackal',
    requirements: [ { actionName: 'use', int: 4 } ],
    async onUse() {
      store.player.xp += 400
    },
  },
]
