import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { StoriesService } from './services/stories.service';
import { Workerpool } from './jobs/workerpool';
import { StoriesGateway } from './gateway/stories.gateway';

@Module({
  imports: [DatabaseModule],
  providers: [StoriesService, Workerpool, StoriesGateway],
})
export class StoriesModule {}
