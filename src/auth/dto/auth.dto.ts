
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
}
