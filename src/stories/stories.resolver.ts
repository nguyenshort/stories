import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference
} from '@nestjs/graphql'
import { StoriesService } from './stories.service'
import { Story } from './entities/story.entity'
import {
  CategoriesProxy,
  CategoryFragments,
  CurrentUser,
  InputValidator,
  MicroAuthGuard,
  NotFoundError,
  TestUser,
  UserFragments
} from '@comico/shared'
import { CreateStoryInput } from './dto/create-story.input'
import { Logger, UseGuards } from '@nestjs/common'
import { GetStoriesFilter } from './filter/get-stories.filter'
import { CountStoriesFilter } from './filter/count-stories.filter'
import { UpdateStoryInput } from './dto/update-story.input'
import { SomeStoriesFilter } from './filter/some-stories.filter'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Resolver(() => Story)
export class StoriesResolver {
  readonly logger = new Logger(StoriesResolver.name)

  constructor(
    private readonly storiesService: StoriesService,
    private readonly categoriesService: CategoriesProxy,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Mutation(() => Story)
  @UseGuards(MicroAuthGuard)
  @TestUser()
  async createStory(
    @Args('input', new InputValidator()) input: CreateStoryInput,
    @CurrentUser() user
  ) {
    const categories = await this.categoriesService.getCategories(
      input.categories
    )
    input.categories = categories.map((category) => category.id)
    return this.storiesService.create(user, input)
  }

  @Mutation(() => Story)
  async updateStory(
    @Args('input', new InputValidator()) input: UpdateStoryInput
  ) {
    const story = await this.storiesService.findOne(
      { _id: input.id },
      {
        _id: 1
      }
    )
    if (!story) {
      throw new NotFoundError('Story not found')
    }
    if (input.categories) {
      const _categories = await this.categoriesService.getCategories(
        input.categories
      )
      input.categories = _categories.map((category) => category.id)
    }
    const _form = {}
    Object.entries(input).forEach(([key, value]) => {
      if (value) {
        _form[key] = value
      }
    })
    return this.storiesService.update({ _id: story._id }, input)
  }

  @Query(() => Story, { name: 'story' })
  async findOne(@Args('slug', { type: () => String }) slug: string) {
    const story = await this.storiesService.findOne({ slug })
    if (!story) {
      throw new NotFoundError('Story not found')
    }
    this.eventEmitter.emit('story:view', story)
    return story
  }

  @Query(() => [Story], { name: 'stories' })
  async findMany(
    @Args('filter', new InputValidator()) filter: GetStoriesFilter
  ) {
    const match = this.storiesService.buildStoriesMatch(filter)
    this.logger.debug(`findMany: ${JSON.stringify(match)}`)

    return this.storiesService.findMany(match, filter)
  }

  @Query(() => Int)
  async countStories(
    @Args('filter', new InputValidator()) filter: CountStoriesFilter
  ) {
    const match = this.storiesService.buildStoriesMatch(filter)
    return this.storiesService.count(match)
  }

  @Query(() => [Story])
  async someStories(
    @Args('filter', new InputValidator()) filter: SomeStoriesFilter
  ) {
    const match = this.storiesService.buildStoriesMatch(filter)
    this.logger.debug(`someStories: ${JSON.stringify(match)}`)
    return this.storiesService.some(match, filter.size)
  }

  @ResolveField('user', () => UserFragments)
  async getUser(@Parent() post: Story) {
    return { __typename: 'User', id: post.user }
  }

  @ResolveField('categories', () => [CategoryFragments])
  getCategories(@Parent() post: Story) {
    return post.categories.map((category) => {
      return { __typename: 'Category', id: category }
    })
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.storiesService.findOne({ _id: reference.id })
  }
}
