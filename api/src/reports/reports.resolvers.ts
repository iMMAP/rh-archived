import { Component, UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, DelegateProperty, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Report } from './reports.interface';
import { ReportsService } from './reports.service';
import { ReportsGuard } from './reports.guard';

const pubsub = new PubSub();

@Resolver('Report')
export class ReportsResolvers {
  constructor(private readonly reportsService: ReportsService) {}

  @Query()
  @UseGuards(ReportsGuard)
  async getReports() {
    return await this.reportsService.findAll();
  }

  @Query('report')
  async findOneById(obj, args, context, info): Promise<Report> {
    const { id } = args;
    return await this.reportsService.findOneById(+id);
  }

  @Mutation('createReport')
  async create(obj, args: Report, context, info): Promise<Report> {
    const createdReport = await this.reportsService.create(args);
    pubsub.publish('reportCreated', { reportCreated: createdReport });
    return createdReport;
  }

  @Subscription('reportCreated')
  reportCreated() {
    return {
      subscribe: () => pubsub.asyncIterator('reportCreated'),
    };
  }
}