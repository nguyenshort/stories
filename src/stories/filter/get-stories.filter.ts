import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'
import {FilterOffset, IsObjectID} from "@comico/shared";
import {StoryStatus} from "../enum/story.status.enum";

@InputType()
export class GetStoriesFilter extends FilterOffset {
  @Field(() => String, {
    description: 'To sort in counter use syntax: "{name}-{socpe}"'
  })
  @IsNotEmpty({ message: 'Sắp xếp là bắt buộc' })
  sort: string

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
