import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  state?: string;
  @IsString()
  @IsOptional()
  neighborhood?: string;
  @IsString()
  @IsOptional()
  street?: string;
  @IsString()
  @IsOptional()
  number?: string;
  @IsString()
  @IsOptional()
  path?: string;
}
