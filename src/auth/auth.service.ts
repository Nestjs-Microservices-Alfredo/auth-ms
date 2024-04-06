import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterAuthDto, AuthDto } from './dto';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';
import { getPassword, setPassword } from './../common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { envs } from 'src/config';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(Auth.name) 
    private readonly authMongo: Model<Auth>,

    private readonly jwtService: JwtService
  ) {}
  async create(registerAuthDto: RegisterAuthDto) {

    try {

    const { password, ...rest } = registerAuthDto;

    const create = await this.authMongo.create({ ...rest, password: setPassword(password) });

    const  { password: _, ...user } = create['_doc'];
    
    return user;
      
    } catch (err) {

      throw new RpcException({
        status: 400,
        message: err.message
      });
      
    }
  }

  async login( authDto: AuthDto ) {
    try {

      const { email, password } = authDto;
  
      const user = await this.authMongo.findOne({ email });

      if( !user ) throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: `User or Password invalid` })
      if( !getPassword(password, user.password) ) throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: `User or Password invalid` })
      
        const { password: _, ...rest } = user['_doc'];

      return {
        user: rest,
        token: await this.getJwt({ uid: rest._id, email: rest.email })
      };
        
      } catch (err) {
  
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: err.message
        });
        
      }
  }

  async verifyToken( token: string ) {
    try {

      const { sub, iat, exp, ...user } = await this.jwtService.verifyAsync( token, {
        secret: envs.jwt
      }
      );

      return {
        user,
        token: await this.getJwt({ uid: user._id, email: user.email })
      };
      
    } catch ( err ) {
      throw new RpcException({ status: HttpStatus.UNAUTHORIZED, message: 'Token invalid'})
    }
  }



  async getJwt( payload: JwtPayload ) {

    const jwt = await this.jwtService.signAsync( payload );

    return jwt;

  }

 
}
