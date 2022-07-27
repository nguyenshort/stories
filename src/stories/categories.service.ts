import {Inject, Injectable, Logger} from '@nestjs/common'
import {ClientProxy} from "@nestjs/microservices";
import {Category} from "./entities/category.entity";
import {lastValueFrom} from "rxjs";
import {ComicoAdapterKey} from "@comico/shared";

@Injectable()
export class CategoriesService {

  readonly logger = new Logger(CategoriesService.name)

  constructor(@Inject(ComicoAdapterKey.CATEGORIES) readonly client: ClientProxy) {}

  async getCategories(input: string[]): Promise<Category[]> {

    try {
      return lastValueFrom(this.client.send<Category[], string[]>('categories:findMany', input))
    } catch (e) {
        this.logger.error(`categories:findMany: ${e}`)
    }

    return []

  }
}
