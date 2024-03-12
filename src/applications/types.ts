import { IsNotEmpty } from 'class-validator';

export class ApplicationDto {
  @IsNotEmpty()
  name: string;
  createdBy: string;
}

export interface ApplicationModel {
  id: string;
  name: string;
  createdAt: Date;
  status: string;
  createdBy: string;
}
