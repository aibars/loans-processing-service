import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsIn(['Applicant', 'Admin'], { each: true })
  role: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
