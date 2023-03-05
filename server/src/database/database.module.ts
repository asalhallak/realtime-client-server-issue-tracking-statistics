import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesSchema } from './stories/stories.schema';
import { StoriesRepository } from './stories/stories.repository';

@Module({
  providers: [StoriesRepository],
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27018/tracking'),
    MongooseModule.forFeature([{ name: 'Stories', schema: StoriesSchema }]),
  ],
  exports: [StoriesRepository],
})
export class DatabaseModule {}
