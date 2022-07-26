import { Field, ID, InputType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import {StoryStatus} from "../enum/story.status.enum";
import {IsObjectID} from "@comico/shared";

@InputType()
export class CountStoriesFilter {
  @Field(() => [StoryStatus], {
    description: 'Filter by status',
    nullable: true
  })
  status: [StoryStatus]

  @Field(() => String, { nullable: true })
  authors: string

  @Field(() => String, { nullable: true })
  teams: string

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsObjectID({ message: 'ID không hợp lệ' })
  user: string

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsObjectID({ message: 'ID không hợp lệ' })
  category: string
}
