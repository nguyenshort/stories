import {Module} from '@nestjs/common';
import {StoriesService} from './stories.service';
import {StoriesResolver} from './stories.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import {Story, StorySchema} from "./entities/story.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {CategoriesService} from "./categories.service";


export const CATEGORY_SERVICE = ClientsModule.register([
    {
        name: 'CATEGORY_SERVICE',
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'categories_queue',
            queueOptions: {
                durable: false
            }
        }
    }
])

@Module({
    imports: [
        CATEGORY_SERVICE,
        MongooseModule.forFeatureAsync([
            {
                name: Story.name,
                useFactory: () => {
                    const schema = StorySchema
                    schema.plugin(require('mongoose-slug-updater'))
                    return schema
                }
            }
        ])],
    providers: [StoriesResolver, StoriesService, CategoriesService]
})
export class StoriesModule {}
