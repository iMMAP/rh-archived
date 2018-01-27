import { Component } from '@nestjs/common';
import { Report } from './reports.interface';

@Component()
export class ReportsService {
  private readonly reports: Report[] = [{ id: 1, name: 'Report' }];

  create(report: Report): Report{
    this.reports.push(report);
    return report;
  }

  findAll(): Report[] {
    return this.reports;
  }

  findOneById(id: number): Report {
    return this.reports.find(report => report.id === id);
  }
}