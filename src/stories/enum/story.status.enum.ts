import { registerEnumType } from '@nestjs/graphql'

export enum StoryStatus {
  ON_GOING = 'OnGoing',
  END = 'End',
  DROP = 'Drop'
}

registerEnumType(StoryStatus, {
  name: 'StoryStatus'
})
