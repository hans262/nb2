function login(req, res, next) {
    var method = req.method, relativePath = req.relativePath;
    if (method === 'GET' && relativePath === '/login') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200, 'OK');
        res.end("\n      <form action=\"/getToken\" method=\"post\">\n        Username: <input type=\"text\" name=\"username\">\n        Password: <input type=\"password\" name=\"password\">\n        <input type=\"submit\">\n      </form>\n    ");
    }
    else {
        next();
    }
}
module.exports = login;
//# sourceMappingURL=Login.js.map