import { Injectable } from '@nestjs/common'
import { CreateStoryInput } from './dto/create-story.input'
import { InjectModel } from '@nestjs/mongoose'
import {FilterQuery, Model, ProjectionType, Types} from 'mongoose'
import {Story, StoryDocument} from "./entities/story.entity";
import {GetStoriesFilter} from "./filter/get-stories.filter";
import {User} from "./entities/user.entity";
import {CountStoriesFilter} from "./filter/count-stories.filter";

@Injectable()
export class StoriesService {
  constructor(@InjectModel(Story.name) private model: Model<StoryDocument>) {}

  async create(user: User, input: CreateStoryInput) {
    return this.model.create({
      ...input,
      user: new Types.ObjectId(user.id),
      categories: input.categories.map((category) => new Types.ObjectId(category)),
      createdAt: Date.now()
    })
  }

  async findMany(match: FilterQuery<StoryDocument>, filter: GetStoriesFilter) {
    return this.model
      .find()
      .sort({
        [filter.sort]: -1
      })
      .skip(filter.offset)
      .limit(filter.limit)
  }

  async findOne(
    filter: FilterQuery<StoryDocument>,
    projection?: ProjectionType<StoryDocument>
  ) {
    return this.model.findOne(filter, projection)
  }

  async update(
    filter: FilterQuery<StoryDocument>,
    doc: Partial<CreateStoryInput>
  ) {
    return this.model.findOneAndUpdate(filter, doc, { new: true })
  }

  async count(match: FilterQuery<StoryDocument>) {
    return this.model.countDocuments(match)
  }

  async some(match: FilterQuery<StoryDocument>, size: number) {
    return this.model.aggregate([
      { $match: match },
      { $sample: { size } },
      { $addFields: { id: '$_id' } }
    ])
  }


  buildStoriesMatch(
      filter: CountStoriesFilter
  ): FilterQuery<StoryDocument> {
    const match: FilterQuery<StoryDocument> = {}
    if (filter.status) {
      match.status = { $in: filter.status }
    }
    if (filter.category) {
      match.categories = new Types.ObjectId(filter.category)
    }
    if (filter.authors) {
      match.authors = filter.authors
    }
    if (filter.teams) {
      match.teams = filter.teams
    }
    return match
  }
}
