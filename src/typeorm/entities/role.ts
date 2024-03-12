import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'roles' }) //table name
export class Role {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
