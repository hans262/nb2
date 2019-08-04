"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const mysql_2 = require("../configure/mysql");
exports.POOL = mysql_1.createPool({
    connectionLimit: mysql_2.CONNECTION_LIMIT,
    host: mysql_2.HOST,
    port: mysql_2.PORT,
    user: mysql_2.USER,
    password: mysql_2.PASSWORD,
    database: mysql_2.DATABASE,
});
function Query(sql) {
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
exports.Query = Query;
//# sourceMappingURL=mysql.js.map