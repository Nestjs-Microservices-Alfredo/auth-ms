import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthSchema, Auth } from './entities/auth.entity';
import { envs } from './../config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema
      },
    ]),

    JwtModule.register({
      secret: envs.jwt,
      signOptions: { expiresIn: '15d'},
    })
  ]
})
export class AuthModule {}
