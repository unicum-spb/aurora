import { inject } from '@loopback/core';
import { TokenService, authenticate } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { TypeQuantumReportModel, Scalars } from '@/types';

import { post, requestBody, get, param } from '@loopback/rest';

import { ReportRepository } from '../repositories';
import { QuantumReportModel } from '../models';

import { ReportService } from '../services/report-service';

import { FORM_DATA } from '../utils/multipart-form-data-body-parser';

import { TokenServiceBindings, ReportServiceBindings } from '../keys';

import { QuantumReportSchema } from './specs/report-controller.specs';
import { OPERATION_SECURITY_SPEC } from '../utils/security-spec';

export class ReportController {
  constructor(
    @repository(ReportRepository) public reportRepository: ReportRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(ReportServiceBindings.REPORT_SERVICE)
    public reportService: ReportService<Array<Express.Multer.File>, Array<TypeQuantumReportModel>>,
  ) { }

  @post('/reports', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Load files to create reports',
        content: {
          'application/json': {
            schema: QuantumReportSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      description: 'multipart/form-data value',
      required: true,
      content: {
        [FORM_DATA]: {
          schema: {},
        },
      },
    })
    files: Array<Express.Multer.File>,
  ): Promise<Array<TypeQuantumReportModel>> {
    const isValid = this.reportService.verifyFiles(files);
    if (isValid) {
      const reports = await this.reportService.createReport(files);
      return reports;
    }
    return [];
  }

  @get('/reports/{reportId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            'x-ts-type': QuantumReportModel,
          }
        }
      }
    }
  })
  @authenticate('jwt')
  async findById(@param.path.string('reportId') reportId: Scalars['String']): Promise<TypeQuantumReportModel> {
    return this.reportRepository.findById(reportId);
  }
}
