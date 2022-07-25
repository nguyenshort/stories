import {Resolver, Query, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import { StoriesService } from './stories.service';
import { Story } from './entities/story.entity';
import {User} from "./entities/user.entity";

@Resolver(() => Story)
export class StoriesResolver {
  constructor(private readonly storiesService: StoriesService) {}

  @Query(() => Story, { name: 'story' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.storiesService.findOne(id);
  }

  @ResolveField('user', () => User)
  getUser(@Parent() post: User) {
    return { __typename: 'User', id: 'post.userId' };
  }
}
