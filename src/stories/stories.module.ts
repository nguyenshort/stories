import { Module } from '@nestjs/common'
import { StoriesResolver } from './stories.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Story, StorySchema } from './entities/story.entity'
import { ClientsModule } from '@nestjs/microservices'
import { StoriesController } from './stories.controller'
import { StoriesService } from './stories.service'
import { CategoriesProxy, ComicoAdapter, CountersProxy } from '@comico/shared'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { StoriesEvents } from './events'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Story.name,
        useFactory: () => {
          const schema = StorySchema
          schema.plugin(require('mongoose-slug-updater'))
          return schema
        }
      }
    ]),
    ClientsModule.register([
      ComicoAdapter.users(),
      ComicoAdapter.categories(),
      ComicoAdapter.counters()
    ]),
    EventEmitterModule.forRoot()
  ],
  providers: [
    StoriesResolver,
    StoriesService,
    CategoriesProxy,
    CountersProxy,
    StoriesEvents
  ],
  controllers: [StoriesController]
})
export class StoriesModule {}
