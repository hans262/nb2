"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let req = {
    name: 'huahua'
};
let res = {
    age: 18
};
let con = (req, res) => {
    return (...M) => {
        try {
            let i = 0;
            const next = () => {
                const m = M[i++];
                if (!m)
                    return;
                m(req, res, next);
            };
            next();
        }
        catch (e) {
            console.log('500 服务器错误');
        }
    };
};
con(req, res)((req, res, next) => {
    req.name = 'goudan';
    res.age = 20;
    next();
}, (req, res, next) => {
    console.log(req);
    console.log(res);
});
//# sourceMappingURL=index.js.map