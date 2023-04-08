export type BuffName =
  'str' |
  'dex' |
  'int' |
  'credit' |
  'hp' |
  'disk' |
  'ram' |
  'dice' |
  'roll' |
  'sword' |
  'shield'

export const buffNames = [
  'str',
  'dex',
  'int',
  'credit',
  'hp',
  'disk',
  'ram',
  'dice',
  'roll',
  'sword',
  'shield',
]

export const buffLabel = (name: BuffName): string | undefined => {
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
    case 'sword': return 'Sword'
    case 'shield': return 'Shield'
    default:
  }
}

export const buffIcon = (name: BuffName): string | undefined => {
  switch (name) {
    case 'str': return 'str'
    case 'dex': return 'dex'
    case 'int': return 'int'
    case 'credit': return 'credit'
    case 'hp': return 'heart'
    case 'disk': return 'harddrive'
    case 'ram': return 'cpu'
    case 'dice': return 'dice'
    case 'roll': return 'roll'
    case 'sword': return 'sword'
    case 'shield': return 'shield'
    default:
  }
}
