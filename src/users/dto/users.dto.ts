import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersDTO {
  @IsString()
  @IsNotEmpty({
    message: 'Campo obrigatório',
  })
  name: string;
  @IsEmail()
  @IsNotEmpty({
    message: 'Campo obrigatório',
  })
  email: string;
  @IsString()
  @IsNotEmpty({
    message: 'Campo obrigatório',
  })
  password: string;
}
