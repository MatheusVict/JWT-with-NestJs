import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid') // Da pra declarar uuid só de por o nome
  id: string;

  @Column({ name: 'first_name', type: 'text' })
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName: string;

  @Column()
  email: string;

  @Column({ type: 'text' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAT: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert() //Antes de enserir um novo executa isso aqui
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
