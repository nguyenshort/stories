import { Module } from '@nestjs/common';
import {DatabaseModule} from "./database/database.module";
import {ApolloModule} from "./apollo/apollo.module";
import {AuthModule} from "@comico/shared";
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [ApolloModule, DatabaseModule, AuthModule, StoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
