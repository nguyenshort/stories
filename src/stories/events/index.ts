import { OnEvent } from '@nestjs/event-emitter'
import { StoryDocument } from '../entities/story.entity'
import { Injectable } from '@nestjs/common'
import { CountersProxy } from '@comico/shared'

@Injectable()
export class StoriesEvents {
  constructor(private readonly countersService: CountersProxy) {}

  @OnEvent('story:view')
  async incView(story: StoryDocument) {
    await this.countersService.inc({
      target: story.id,
      group: 'views',
      value: 1
    })
  }
}
