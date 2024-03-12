import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * The role database entity
 */
@Entity({ name: 'roles' }) //table name
export class Role {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;
}
