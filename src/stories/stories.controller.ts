import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import {Controller, Logger} from '@nestjs/common'
import {StoriesService} from "./stories.service";
import {StoryDocument} from "./entities/story.entity";

@Controller()
export class StoriesController {

    readonly logger = new Logger(StoriesController.name)

    constructor(
        private readonly storiesService: StoriesService
    ) {}

    @MessagePattern('stories:findOne')
    async findOne(@Payload() id: string, @Ctx() context: RmqContext): Promise<StoryDocument|null> {
        return this.storiesService.findOne({ _id: id })
    }
}
