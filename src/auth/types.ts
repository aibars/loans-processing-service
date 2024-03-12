import { IsNotEmpty } from 'class-validator';

export class SendOTPDto {
  @IsNotEmpty()
  reservationHash: string;
}

export class CheckOTPDto extends SendOTPDto {
  @IsNotEmpty()
  code: string;
}

export class ApiKey {
  name: string;
  key: string;
}
