import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo'
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      },
      plugins: [ApolloServerPluginInlineTraceDisabled()]
    })
  ]
})
export class ApolloModule {}
