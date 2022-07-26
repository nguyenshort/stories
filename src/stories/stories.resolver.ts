import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {StoriesService} from './stories.service';
import {Story} from './entities/story.entity';
import {User} from "./entities/user.entity";
import {Category} from "./entities/category.entity";
import {CurrentUser, InputValidator, MicroAuthGuard, NotFoundError, TestUser} from "@comico/shared";
import {CreateStoryInput} from "./dto/create-story.input";
import {Logger, UseGuards} from "@nestjs/common";
import {CategoriesService} from "./categories.service";

@Resolver(() => Story)
export class StoriesResolver {

  readonly logger = new Logger(StoriesResolver.name)

  constructor(
      private readonly storiesService: StoriesService,
      private readonly categoriesService: CategoriesService
  ) {}

  @Mutation(() => Story)
  @UseGuards(MicroAuthGuard)
  @TestUser()
  async createStory(
      @Args('input', new InputValidator()) input: CreateStoryInput,
      @CurrentUser() user: User
  ) {
    const categories = await this.categoriesService.getCategories(input.categories)
    input.categories = categories.map((category) => category.id)
    return this.storiesService.create(user, input)
  }

  @Query(() => Story, { name: 'story' })
  async findOne(@Args('slug', { type: () => String }) slug: string) {
    const story = await this.storiesService.findOne({ slug })
    if (!story) {
      throw new NotFoundError('Story not found')
    }
    // this.eventEmitter.emit('story:view', story)
    return story
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() post: User) {
    return { __typename: 'User', id: 'post.userId' };
  }

  @ResolveField('categories', () => [Category])
  async getCategories(@Parent() post: Story) {
    const _categories = post.categories.map((category) => category.toString());
    const categories = await this.categoriesService.getCategories(_categories)
    console.log(categories)
    return categories
  }
}
