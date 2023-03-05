import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StatsMessage } from '../dtos/stats.message';
import { CreateStoryDto } from '../dtos/create-story.request';
import { StoriesService } from '../services/stories.service';
import { ReplaySubject } from 'rxjs';

const STATS_EVENT = 'stats';
const create_Story_EVENT = 'createStory';
@WebSocketGateway({ cors: true })
export class StoriesGateway {
  @WebSocketServer() private readonly _server: Server;
  private _createStorySubject: ReplaySubject<CreateStoryDto> =
    new ReplaySubject<CreateStoryDto>(1);

  public $story = this._createStorySubject.asObservable();

  emitStats(message: StatsMessage) {
    this._server.emit(STATS_EVENT, message);
  }

  @SubscribeMessage(create_Story_EVENT)
  handleMessage(@MessageBody() body: CreateStoryDto) {
    this._createStorySubject.next(body);
  }
}
