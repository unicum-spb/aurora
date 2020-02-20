import { Telegram, TelegramOptions } from 'telegraf';

import { config } from '../config';


class Bot extends Telegram {
  constructor(token: string, options?: TelegramOptions) {
    super(token, options)
  }
}

const bot = new Bot(config.webeorToken)

export default bot;