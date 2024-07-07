import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  CreateDateColumn,
} from "typeorm";
import { Goods } from "./Goods.js";

@Entity()
export class Collect {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { length: 10 })
  type!: "collect" | "like";

  @ManyToOne(() => Goods, (goods) => goods.collects)
  goods!: Relation<Goods>;

  @Column()
  uid!: string;

  @CreateDateColumn()
  create_at!: Date;
}
