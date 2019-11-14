import { QuantumReportModel } from '@/types';

import { inject } from '@loopback/core';
import { post, requestBody, RestBindings } from '@loopback/rest';
import { repository } from '@loopback/repository';

import { User } from '../models';

import { FORM_DATA } from '../utils/multipart-form-data-body-parser';

import { Processor } from '../processors/quantum';

export class UploadController {
  constructor () { }

  @post('/upload', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: '',
      },
    },
  })
  async upload(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        [FORM_DATA]: {
          schema: {},
        },
      },
    })
    files: Array<Express.Multer.File>,
  ) {
    const reports: Array<QuantumReportModel> = [];

    for (const file of files) {
      const processor = new Processor(file);

      await processor.unpackZIP();
      await processor.extractFiles();
      const result = processor.buildReports();

      reports.push(result);
    }
    
    return reports;
  }
}
