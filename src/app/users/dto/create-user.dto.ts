import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/menssage';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    // Past helpers tem todos os regex de validação
    message: MessageHelper.Password_Valid,
  }) //Valida se a senha é forte
  password: string;
}
