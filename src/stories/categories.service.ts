import {Inject, Injectable, Logger} from '@nestjs/common'
import {ClientProxy} from "@nestjs/microservices";
import {Category} from "./entities/category.entity";
import {lastValueFrom} from "rxjs";

@Injectable()
export class CategoriesService {

  readonly logger = new Logger(CategoriesService.name)

  constructor(@Inject('CATEGORY_SERVICE') readonly client: ClientProxy) {}

  async getCategories(input: string[]) {

    try {
      return lastValueFrom(this.client.send<Category[], string[]>('categories:findMany', input))
    } catch (e) {
        this.logger.error(`categories:findMany: ${e}`)
    }

    return []

  }
}