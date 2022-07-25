import { Injectable } from '@nestjs/common';
import { CreateStoryInput } from './dto/create-story.input';
import { UpdateStoryInput } from './dto/update-story.input';

@Injectable()
export class StoriesService {
  create(createStoryInput: CreateStoryInput) {
    return 'This action adds a new story';
  }

  findAll() {
    return `This action returns all stories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  update(id: number, updateStoryInput: UpdateStoryInput) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
