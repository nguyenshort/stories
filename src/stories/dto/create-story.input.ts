import { InputType, Field, registerEnumType } from '@nestjs/graphql'
import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  ArrayMaxSize,
  IsArray,
  ArrayMinSize
} from 'class-validator'
import {StoryStatus} from "../enum/story.status.enum";
import {IsObjectID} from "@comico/shared";


@InputType()
export class CreateStoryInput {
  @Field()
  @IsNotEmpty({ message: 'Tên là bắt buộc' })
  @MinLength(3, {
    message: 'Tên quá ngắn'
  })
  @MaxLength(80, {
    message: 'Tên quá dài'
  })
  name: string

  @Field({ defaultValue: '', nullable: true })
  content: string

  @Field()
  @IsNotEmpty({ message: 'Ảnh bìa là bắt buộc' })
  avatar: string

  @Field({ nullable: true, defaultValue: '' })
  authors: string

  @Field({ nullable: true, defaultValue: '' })
  teams: string

  @Field(() => StoryStatus, {
    nullable: true,
    defaultValue: StoryStatus.ON_GOING
  })
  @IsNotEmpty({ message: 'Trạng thái là bắt buộc' })
  status: StoryStatus

  @Field(() => [String], { nullable: true, description: 'Mảng ID thể loại' })
  @IsArray({ message: 'Mảng thể loại không hợp lệ' })
  @ArrayMaxSize(20, {
    message: 'Số lượng thể loại tối đa là 20'
  })
  @ArrayMinSize(1, { message: 'Số lượng thể loại tối thiểu là 1' })
  @IsObjectID({ message: 'Phải là mảng objectID' })
  categories: string[]
}

registerEnumType(StoryStatus, {
  name: 'StoryStatus'
})
