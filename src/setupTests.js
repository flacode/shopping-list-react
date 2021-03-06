import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { notify } from 'react-notify-toast';

configure({ adapter: new Adapter() });
notify.show = jest.fn();
global.deleteItem = jest.fn();

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

