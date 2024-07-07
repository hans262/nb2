import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nickname!: string;

  @Column({ unique: true })
  account!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ default: "这是一个傻蛋" })
  intro!: string;

  @CreateDateColumn()
  create_at!: Date;
}
