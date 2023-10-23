import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserForgetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export const regexPassword =
  '(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'newPassword is too short' })
  @MaxLength(32, { message: 'newPassword is too long' })
  @Matches(regexPassword)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'confirmPassword is too short' })
  @MaxLength(32, { message: 'confirmPassword is too long' })
  @Matches(regexPassword)
  confirmPassword: string;
}
