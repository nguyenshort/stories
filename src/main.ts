import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";
import {buildRMQ, ComicoQueue} from "@comico/shared";

async function bootstrap() {
  const logger = new Logger('Microservice')

  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>(buildRMQ({
    urls: ['amqp://localhost:5672'],
    queue: ComicoQueue.STORIES
  }))


  await app.startAllMicroservices()
  await app.listen(3005)

  logger.verbose('Microservice is listening')
}
bootstrap();
