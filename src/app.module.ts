import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';

@Module({
  imports: [

    MongooseModule.forRoot(envs.mongoUrl),

    NatsModule,
    AuthModule
  ],
})
export class AppModule {}
