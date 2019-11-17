type JSON = {
  [key: string]: any
};

type StorageEvent = {
  key: string;
  newValue: any;
  oldValue: any;
  url: string;
  uri: string;
}

class Storage {
  protected storage: any;
  private listeners: JSON;
  private listening: boolean;
  private prevKey: string;
  private prevValue: string;

  constructor (implementation: any) {
    this.storage = implementation;
    this.listeners = {};
    this.listening = false;
    this.prevKey = '';
    this.prevValue = '';
  }

  public set (key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get (key: string): any {
    const result = this.storage.getItem(key);
    if (result === 'undefined') return null;
    return JSON.parse(result);
  }

  public remove (key: string): void {
    this.storage.removeItem(key);
  }

  public clear (): void {
    this.storage.clear();
  }

  public contains (key: string): boolean {
    return !!this.storage.getItem(key);
  }

  public watch (key: string, fn: Function): void {
    if (this.listeners[key]) {
      this.listeners[key].push(fn);
    } else {
      this.listeners[key] = [fn];
    }
    if (!this.listening) {
      this.listen();
    }
  }

  public unwatch (key: string, fn: Function): void {
    const listener = this.listeners[key];
    if (listener.length > 1) {
      listener.splice(listener.indexOf(fn), 1);
    } else {
      this.listeners[key] = [];
    }
  }

  private listen (): void {
    // @ts-ignore
    window.addEventListener('storage', this.change.bind(this));
  }

  private change (event: StorageEvent): void {
    const all = this.listeners[event.key];
    if (all) all.forEach((listener: Function) => this.fire(listener, event));
  }

  private fire (listener: Function, event: StorageEvent): void {
    const {
      key, newValue, oldValue, url, uri
    } = event;
    const isPrevKey = this.prevKey === key;
    const isPrevValue = this.prevValue === newValue;

    if (isPrevKey && isPrevValue) return;
    if (newValue !== oldValue) {
      listener(
        JSON.parse(newValue),
        JSON.parse(oldValue),
        url || uri
      );
    }

    this.prevKey = key;
    this.prevValue = newValue;
  }
}

const StorageService = new Storage(localStorage);
const SessionStorage = new Storage(sessionStorage);

export {
  StorageService,
  SessionStorage,
};

export default StorageService;
