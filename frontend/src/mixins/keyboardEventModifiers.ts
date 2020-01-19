import { Vue, Component } from 'vue-property-decorator';

const KEY_0: number = 48;
const KEY_9: number = 57;

const KEYPAD_KEY_0: number = 96;
const KEYPAD_KEY_9: number = 105;

const KEY_LEFT: number = 37;
const KEY_RIGHT: number = 39;

const KEY_BACKSPACE: number = 8;
const KEY_DELETE: number = 46;
const KEY_TAB: number = 9;

const KEY_SPACE: number = 32;
const KEY_V: number = 86;
const KEY_C: number = 67;
const KEY_X: number = 88;


@Component({ inheritAttrs: false })
export class KeyboardEventModifiers extends Vue {
  protected isNumber (event: KeyboardEvent): boolean {
    if (event) {
      const { keyCode } = event;
      return (keyCode >= KEY_0 && keyCode <= KEY_9) || (keyCode >= KEYPAD_KEY_0 && keyCode <= KEYPAD_KEY_9);
    }
    return false;
  }

  protected isRemove (event: KeyboardEvent): boolean {
    if (event) {
      const { keyCode } = event;
      return [ KEY_BACKSPACE, KEY_DELETE ].includes(keyCode);
    }
    return false;
  }

  protected isTabLeftRight (event: KeyboardEvent): boolean {
    if (event) {
      const { keyCode } = event;
      return [ KEY_TAB, KEY_LEFT, KEY_RIGHT ].includes(keyCode);
    }
    return false;
  }

  protected isSpace (event: KeyboardEvent): boolean {
    if (event) {
      const { keyCode } = event;
      return [KEY_SPACE].includes(keyCode);
    }
    return false;
  }

  protected isCtrlV (event: KeyboardEvent): boolean {
    if (event) {
      return (event.ctrlKey || event.metaKey) && event.keyCode === KEY_V;
    }
    return false;
  }

  protected isCtrlC (event: KeyboardEvent): boolean {
    if (event) {
      return (event.ctrlKey || event.metaKey) && event.keyCode === KEY_C;
    }
    return false;
  }

  protected isCtrlX (event: KeyboardEvent): boolean {
    if (event) {
      return (event.ctrlKey || event.metaKey) && event.keyCode === KEY_X;
    }
    return false;
  }

  inputNumberString (event: KeyboardEvent): boolean {
    // цифры проходят
    if (this.isNumber(event)) return true;
    // разрешаем удаление
    if (this.isRemove(event)) return true;
    // разрешаем перемещение курсора влево-вправо, переход по TAB
    if (this.isTabLeftRight(event)) return true;
    // разрешаем Ctrl + C
    if (this.isCtrlC(event)) return true;
    // разрешаем Ctrl + V
    if (this.isCtrlV(event)) return true;
    // разрешаем еще и Ctrl + X
    if (this.isCtrlX(event)) return true;
    event.preventDefault();
    return false;
  }


  inputNoSpace (event: KeyboardEvent): boolean {
    if (!this.isSpace(event)) return true;
    event.preventDefault();
    return false;
  }
}
