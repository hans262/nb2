"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const mysql_2 = require("../conf/mysql");
exports.POOL = mysql_1.createPool({
    connectionLimit: mysql_2.CONNECTION_LIMIT,
    host: mysql_2.HOST,
    port: mysql_2.PORT,
    user: mysql_2.USER,
    password: mysql_2.PASSWORD,
    database: mysql_2.DATABASE,
});
function QUERY(sql) {
    return new Promise((resolve, reject) => {
        exports.POOL.getConnection((err, connection) => {
            if (err)
                return reject(err);
            connection.query(sql, (err, results) => {
                connection.release();
                err ? reject(err) : resolve(results);
            });
        });
    });
}
exports.QUERY = QUERY;
;
(() => __awaiter(this, void 0, void 0, function* () {
    const users = yield QUERY(`SELECT * FROM user ORDER BY password DESC`);
    console.log(users);
}))();
//# sourceMappingURL=sql.js.map