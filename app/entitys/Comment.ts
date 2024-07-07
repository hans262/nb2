//评论
// 没有parent_id，为评论
// 有parent_id，为二级回复
// 有to_uid，在二级回复中回复某个人
// querysql(`
//   CREATE TABLE IF NOT EXISTS comment(
//     gid INT NOT NULL,
//     uid INT NOT NULL,
//     parent_id INT,
//     to_uid INT
//   ) CHARSET = utf8mb4;
// `);

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  CreateDateColumn,
} from "typeorm";
import { Goods } from "./Goods.js";
import { User } from "./User.js";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Goods, (goods) => goods.id)
  goods!: Relation<Goods>;

  @ManyToOne(() => User, (user) => user.id)
  user!: Relation<User>;

  // 有toUser，在二级回复中回复某个人
  @ManyToOne(() => User, (user) => user.id)
  toUser!: Relation<User>;

  // 没有parent_id，为评论
  // 有parent_id，为二级回复
  @Column({ nullable: true })
  parent_id!: string;

  @CreateDateColumn()
  create_at!: Date;
}
