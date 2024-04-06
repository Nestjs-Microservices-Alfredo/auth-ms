import { Injectable } from '@nestjs/common';
import { RegisterAuthDto, AuthDto } from './dto';

@Injectable()
export class AuthService {
  create(registerAuthDto: RegisterAuthDto) {
    
    return registerAuthDto;
  }

  login( authDto: AuthDto ) {
    return authDto;
  }

  verify() {
    return `This action returns a uth`;
  }

 
}
