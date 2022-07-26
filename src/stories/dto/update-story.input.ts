import { CreateStoryInput } from './create-story.input'
import { InputType, Field, PartialType, ID } from '@nestjs/graphql'
import { Types } from 'mongoose'
import {IsObjectID} from "@comico/shared";

@InputType()
export class UpdateStoryInput extends PartialType(CreateStoryInput) {
  @Field(() => ID)
  @IsObjectID()
  id: Types.ObjectId
}
