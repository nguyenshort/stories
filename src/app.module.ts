import {Module} from '@nestjs/common';
import {ApolloModule} from "./apollo/apollo.module";
import {StoriesModule} from './stories/stories.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        ApolloModule,
        MongooseModule.forRoot('mongodb://localhost/stories'),
        StoriesModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
