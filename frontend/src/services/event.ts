class EventEmitter {
  private events: {
    [name: string]: Function[];
  };

  constructor () {
    this.events = {
      'authentication-error': [],
      'internal-server-error': [],
      'change-language': [],
      'token-auth-state': [],
      'call-notification': [],
      'on-esc': [],
      'color-scheme-changed': [],
    };
  }

  emit (eventName: string, data: any) {
    const event = this.events[eventName];
    if (event) event.forEach(fn => fn.call(null, data));
  }

  on (eventName: string, fn: Function) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(fn);
    return () => this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
  }
}

const EventService = new EventEmitter();

export default EventService;
