import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, StoriesModule],
  providers: [AppService],
})
export class AppModule {}
