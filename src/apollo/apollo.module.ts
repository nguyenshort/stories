import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriverConfig, ApolloFederationDriver} from "@nestjs/apollo"
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core'
import {Category} from "../stories/entities/category.entity";
import {User} from "../stories/entities/user.entity";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: {
                federation: 2
            },
            buildSchemaOptions: {
                orphanedTypes: [Category, User]
            },
            plugins: [ApolloServerPluginInlineTraceDisabled()]
        })
    ]
})
export class ApolloModule {}
