import { HttpErrors } from '@loopback/rest';
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';

import { PasswordHasher } from './hash.password.bcryptjs';

import { ReportRepository } from '../repositories';
import { PasswordHasherBindings } from '../keys';

import { TypeQuantumReportModel } from '@/types';

import { Processor } from '../processors/quantum';

export interface ReportService<F, R> {
  verifyFiles(files: F): boolean;
  createReport(files: F): Promise<R>;
}

export class MyReportService implements ReportService<Array<Express.Multer.File>, Array<TypeQuantumReportModel>> {
  constructor(
    @repository(ReportRepository) public reportRepository: ReportRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) { }

  verifyFiles(files: Array<Express.Multer.File>) {
    if (!files.length) {
      throw new HttpErrors.UnprocessableEntity('files, is empty')
    }
    return true;
  }

  async createReport(files: Array<Express.Multer.File>): Promise<Array<TypeQuantumReportModel>> {
    const reports: Array<TypeQuantumReportModel> = [];

    for (const file of files) {
      const processor = new Processor(file);

      await processor.unpackZIP();
      await processor.extractFiles();
      const result = processor.buildReports();

      reports.push(result);
    }

    return reports.sort((prev, next) => {
      if (prev.meta.date < next.meta.date) { return -1; }
      if (prev.meta.date > next.meta.date) { return 1; }
      return 0;
    });
  }
}
