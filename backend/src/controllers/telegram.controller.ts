import { Request, RestBindings, ResponseObject, post, requestBody } from '@loopback/rest';
import { inject } from '@loopback/context';

import Bot from '../bot';

import { config } from '../config';


console.log(config);

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Message for bot',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class TelegramController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  // Map to `GET /ping`
  @post('/telegram', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  send(
    @requestBody() request: { email: string },
  ): object {
    // 207786589
    Bot.sendMessage(config.adminId, `Новая заявка: ${request.email}`)

    console.log(request);

    // Reply with a greeting, the current time, the url, and request headers
    return {
      success: true,
    };
  }
}
