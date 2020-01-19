import { inject } from '@loopback/core';
import { authorize } from '@loopback/authorization';
import { repository, Filter, Where, Count, CountSchema, } from '@loopback/repository';
import { post, get, patch, del, param, requestBody } from '@loopback/rest';
import { AuthenticationBindings, authenticate, TokenService } from '@loopback/authentication';

import { UserRepository } from '../repositories';
import { QuantumReportModel } from '../models';

import { compareId } from '../services/id.compare.authorizor';
import { ReportService } from '../services/report-service';

import { FORM_DATA } from '../utils/multipart-form-data-body-parser';
import { Scalars, TypeQuantumReportModel } from '@/types';
import { ReportServiceBindings, TokenServiceBindings } from '../keys';

/**
 * Controller for User's Reports
 */
export class UserReportController {
  constructor(
    @inject(ReportServiceBindings.REPORT_SERVICE)
    public reportService: ReportService<Array<Express.Multer.File>, Array<TypeQuantumReportModel>>,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @repository(UserRepository) protected userRepo: UserRepository
  ) { }

  /**
   * Create or update the reports for a given user
   * @param userId User id
   * @param cart Shopping cart
   */
  @post('/users/{userId}/reports', {
    responses: {
      '200': {
        description: 'User.Report model instance',
        content: {
          'application/json': { schema: { 'x-ts-type': QuantumReportModel } }
        },
      },
    },
  })
  @authenticate('jwt')
  // @authorize({ resource: 'report', scopes: ['create'] })
  async createReport(
    @param.path.string('userId') userId: Scalars['String'],
    @requestBody({
      description: 'multipart/form-data value',
      required: true,
      content: {
        [FORM_DATA]: {},
      },
    })
    files: Array<Express.Multer.File>,
  ): Promise<Array<TypeQuantumReportModel>> {
    // validate the payload value
    // has nothing to do with authorization
    const isValid = this.reportService.verifyFiles(files);
    if (isValid) {
      const createdReports = await this.reportService.createReports(files);
      for (const report of createdReports) {
        try {
          await this.userRepo.reports(userId).create(report);
        } catch (error) {
          console.error(error)
        }
      }
      const reports = await this.userRepo.reports(userId).find();
      return reports;
    }
    return [];
  }

  @get('/users/{userId}/reports.json', {
    responses: {
      '200': {
        description: "Array of User's Reports",
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': QuantumReportModel } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  // @authorize({ resource: 'report', scopes: ['find'], voters: [compareId] })
  async findReports(
    @param.path.string('userId') userId: string,
    @param.query.object('filter') filter?: Filter<QuantumReportModel>,
  ): Promise<QuantumReportModel[]> {
    const reports = await this.userRepo.reports(userId).find(filter);

    if (!filter) {
      for (const report of reports) {
        delete report.reports;
      }
    }

    return reports;
  }

  @patch('/users/{userId}/reports', {
    responses: {
      '200': {
        description: 'User.Report PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  // @authorize({ resource: 'report', scopes: ['patch'], voters: [compareId] })
  async patchReports(
    @param.path.string('userId') userId: string,
    @requestBody() report: Partial<QuantumReportModel>,
    @param.query.string('where') where?: Where<QuantumReportModel>,
  ): Promise<Count> {
    return this.userRepo.reports(userId).patch(report, where);
  }

  @del('/users/{userId}/reports', {
    responses: {
      '200': {
        description: 'User.Report DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  // @authorize({ resource: 'report', scopes: ['delete'], voters: [compareId] })
  async deleteReports(
    @param.path.string('userId') userId: Scalars['String'],
    @param.query.string('where') where?: Where<QuantumReportModel>,
  ): Promise<Count> {
    return this.userRepo.reports(userId).delete(where);
  }
}
