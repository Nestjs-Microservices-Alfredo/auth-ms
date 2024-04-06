import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport, RpcException } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Microservices Auth');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      }
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new RpcException(errors);
     }
    })
  );

  // app.useGlobalFilters( new RpcCustomExceptionFilter );

  await app.listen();

  logger.log(`Microservices Auth is running Online`);
}
bootstrap();
