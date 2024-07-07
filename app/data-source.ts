import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entitys/User.js";
import { Goods } from "./entitys/Goods.js";
import { Collect } from "./entitys/Collect.js";
import { Comment } from "./entitys/Comment.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "12345678",
  database: "test2",
  synchronize: true,
  logging: ["error"],
  entities: [User, Goods, Collect, Comment],
  migrations: [],
  subscribers: [],
});