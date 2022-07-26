import {Directive, Field, ID, ObjectType} from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class Category {
  @Field(() => ID)
  id: string
}
