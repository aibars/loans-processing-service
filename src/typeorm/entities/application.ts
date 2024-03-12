import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  //todo: states could be a different table
  @Column({ type: 'varchar' })
  status: string;
}
