import Server from '@/classes/items/server'
import File from '@/classes/items/file'
import FTP from '@/classes/softwares/ftp'
import Viewer from '@/classes/softwares/viewer'
import Deleter from '@/classes/softwares/deleter'
import Cracker from '@/classes/softwares/cracker'
import { store } from '@/store'

export class IntroServer extends Server {
  constructor(data) {
    super({
      ...data,
      name: 'Intro server',
      crackable: true,
      protected: true,
    });
  }

  mounted() {
    super.mounted()

    this.addItem([
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

    store.player.addItem([
      new FTP({
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
  }
}
