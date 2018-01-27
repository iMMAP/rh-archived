import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolvers } from './reports.resolvers';

@Module({
  components: [ReportsService, ReportsResolvers]
})
export class ReportsModule {}