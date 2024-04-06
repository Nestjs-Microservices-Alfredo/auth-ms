import { IsNotEmpty, IsString, IsEmail, IsStrongPassword } from "class-validator";

export class RegisterAuthDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}
