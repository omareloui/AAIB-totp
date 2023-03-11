import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class GetQRCodeDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}

export class VerifyTotpDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  public token: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}

export class AddUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
