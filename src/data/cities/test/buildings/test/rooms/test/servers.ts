import { File } from '@/classes/server/file'
import { Ftp } from '@/classes/softwares/ftp'
import { Viewer } from '@/classes/softwares/viewer'
import { Deleter } from '@/classes/softwares/deleter'
import { Cracker } from '@/classes/softwares/cracker'
import { IServerData, Server } from '@/classes/server/server'

export default {
  name: 'Test server',
  crackable: true,
  protected: true,

  mounted(this: Server): void {
    this.addFile([
      new File({
        name: 'Plots.txt',
        version: 1,
        downloadable: true,
        uploadable: true,
        weight: 2,
        content: 'Some sexy plot for a cool project!',
      }),

      new File({
        name: 'Email (from shawn@gmail.com).txt',
        version: 1,
        weight: 4,
        downloadable: true,
        content: [
          'Date: Fri, Oct 11',
          'From: shawn@gmail.com',
          'To: bob@gmail.com',
          'Subject: Important, please answer quick',
          '---------------------------------------',
          'Bob, there is something I\'d like to discuss with you!',
          '',
          'Regards,',
          'Shawn'
        ].join('\n'),
      }),
    ])

    window.store.player.addItem([
      new Ftp({
        name: 'ZModem',
        deletable: true,
        installed: true,
        weight: 11,
      }),
      new Viewer({
        name: 'Viewer',
        weight: 3,
      }),
      new Deleter({
        name: 'Del',
        installed: true,
        weight: 1,
      }),
      new Cracker({
        name: 'CrackerJack',
        installed: true,
        weight: 1,
      }),
    ])
  },
} as IServerData
