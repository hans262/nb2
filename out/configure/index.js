"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = 5000;
exports.HOST = "127.0.0.1";
exports.ROOT = "C://";
exports.INDEX_PAGE = "index.html";
exports.ZIP_MATCH = "^\.(css|js|html|woff)$";
exports.CLUSTER = true;
exports.CACHE = true;
exports.CACHE_MAX_AGE = 3600;
exports.CROSS = true;
exports.LOGIN = false;
exports.USER = {
    username: "root",
    password: "123456"
};
exports.SESSION_EXPIRES = 20;
exports.REACT_APP = false;
exports.API_PREFIX = '/api';
exports.WEB_SOCKET_PORT = 8888;
exports.SOCKET_SERVER_PORT = 9999;
exports.proxyConfig = {
    '/proxy': 'http://127.0.0.1:7777',
    '/douban': 'https://movie.douban.com/'
};
//# sourceMappingURL=index.js.map