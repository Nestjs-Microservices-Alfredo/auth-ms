import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterAuthDto, AuthDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  create(
    @Payload() registerAuthDto: RegisterAuthDto
) {
    return this.authService.create( registerAuthDto );
  }

  @MessagePattern('auth.login.user')
  login(
    @Payload() authDto: AuthDto
  ) {
    return this.authService.login( authDto );
  }

  @MessagePattern('auth.verfy.token')
  findOne(@Payload() id: number) {
    return this.authService.verify();
  }

 
}
