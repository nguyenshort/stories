import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import {Directive, Field, Float, ID, ObjectType} from '@nestjs/graphql'
import {StoryStatus} from "../enum/story.status.enum";

export type StoryDocument = Story & Document

@Schema({
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})
@ObjectType()
@Directive('@key(fields: "id")')
export class Story {
  @Field(() => ID)
  id: string

  @Field(() => String)
  @Prop({ required: true, index: true })
  name: string

  @Field(() => String)
  @Prop({ slug: 'name', unique: true, index: true })
  slug: string

  @Field(() => String)
  @Prop({ required: true })
  avatar: string

  @Field(() => String)
  @Prop({ default: '' })
  content: string

  @Prop({
    type: Types.ObjectId,
    index: true
  })
  user: Types.ObjectId

  @Field(() => String)
  @Prop({ index: true })
  authors: string

  @Field(() => String)
  @Prop({ index: true })
  teams: string

  @Prop({
    index: true,
    default: StoryStatus.ON_GOING,
    type: String
  })
  @Field(() => StoryStatus, { defaultValue: StoryStatus.ON_GOING })
  status: StoryStatus

  @Prop({
    type: [{ type: Types.ObjectId, index: true }],
    index: true
  })
  categories: Types.ObjectId[]

  // Todo: add counter

  @Field(() => Float)
  @Prop({ default: Date.now, index: true })
  createdAt: number

  @Field(() => Float)
  @Prop({ default: Date.now, index: true })
  updatedAt: number
}

export const StorySchema = SchemaFactory.createForClass(Story)
