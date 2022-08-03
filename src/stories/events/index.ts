import { OnEvent } from '@nestjs/event-emitter';
import { StoryDocument } from '../entities/story.entity';
import { CountersService } from './counters.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoriesEvents {
  constructor(private readonly countersService: CountersService) {}

  @OnEvent('story:view')
  async incView(story: StoryDocument) {
    await this.countersService.inc({
      target: story.id,
      group: 'views',
      value: 1,
    });
  }
}
