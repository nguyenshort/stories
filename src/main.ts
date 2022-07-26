import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger('Microservice')

  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'stories_queue',
      queueOptions: {
        durable: false
      }
    }
  })


  await app.startAllMicroservices()
  await app.listen(3005)

  logger.verbose('Microservice is listening')
}
bootstrap();
