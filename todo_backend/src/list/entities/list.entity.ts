import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn } from 'typeorm';
@Entity()
export class List {
  @PrimaryGeneratedColumn()
  list_id: number;

  @Column()
  list: string;

  @ManyToOne(() => User, (user) => user.list)
  @JoinColumn({name:'userId'})
  user: User;
}
