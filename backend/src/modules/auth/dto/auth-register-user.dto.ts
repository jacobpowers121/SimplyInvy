import { IsEmail, IsString } from "class-validator";

export class AuthRegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  username: string;
}