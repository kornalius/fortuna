import { store } from './store';
import Log from './classes/log';

export const log = (message, target) => {
  store.logs.update(new Log({ message, target }))
}
