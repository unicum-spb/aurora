import { ColorSchemes } from '@/types/enums';

export type InterfaceState = {
  drawer: {
    left: boolean;
    leftMini: boolean;
    right: boolean;
  }
  theme: ColorSchemes;
}
