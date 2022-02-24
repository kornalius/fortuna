export const buffNames = () => ([
  'str',
  'dex',
  'int',
  'credit',
  'hp',
  'disk',
  'ram',
  'dice',
  'roll',
])

export const buffLabel = name => {
  switch (name) {
    case 'str': return 'Strength'
    case 'dex': return 'Dexterity'
    case 'int': return 'Intelligence'
    case 'credit': return 'Credit'
    case 'hp': return 'Hitpoint'
    case 'disk': return 'Disk'
    case 'ram': return 'Ram'
    case 'dice': return 'Dice'
    case 'roll': return 'Roll'
    default:
  }
}

export const buffIcon = name => {
  switch (name) {
    case 'str': return 'mdi:arm-flex'
    case 'dex': return 'fxemoji:running'
    case 'int': return 'noto:brain'
    case 'credit': return 'noto-v1:credit-card'
    case 'hp': return 'mdi:cards-heart'
    case 'disk': return 'whh:harddrivealt'
    case 'ram': return 'whh:cpualt'
    case 'dice': return 'fa-solid:dice-d6'
    case 'roll': return 'jam:refresh-reverse'
    default:
  }
}
