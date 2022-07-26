import {Field, ID, InputType, Int} from '@nestjs/graphql'
import {IsNotEmpty, IsNumber, IsOptional, Max, Min} from 'class-validator'
import {IsObjectID} from "@comico/shared";
import {StoryStatus} from "../enum/story.status.enum";
import {FilterOffset} from "../../apollo/args/filter-offset.input";

@InputType()
export class GetStoriesFilter extends FilterOffset{
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
