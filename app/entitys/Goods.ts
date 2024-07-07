import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.js";
import { Collect } from "./Collect.js";

@Entity()
export class Goods {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ length: 1000, default: "" })
  intro!: string;

  @Column({ default: "public" })
  status!: "public" | "private" | "delete";

  @Column({ default: "free" })
  plan!: "buy" | "free";

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  price!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: Relation<User>;

  //Relation 解决ESM modules  下的依赖循环问题
  @OneToMany(() => Collect, (collect) => collect.goods)
  collects!: Relation<Collect>[];

  @Column("simple-array")
  tags!: string[];

  @Column("simple-json")
  files!: any[];

  @Column("simple-json")
  preview!: any[];

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  update_at!: Date;
}
