import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'orders',
        brokers: ['host.docker.internal:9094'],

      },
      consumer: {
        groupId: 'orders-consumer'
      }
    }
  })
  await app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();
