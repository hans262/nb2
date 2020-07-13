"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Remarkable } = require('remarkable');
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../common/path");
const md = new Remarkable();
fs_1.readdir(path_1.join(path_2.ROOT, './tsdoc'), (err, files) => {
    if (err)
        return;
    files.forEach(f => {
        if (!/.+\.md$/.test(f))
            return;
        console.log(f);
        const b = fs_1.readFileSync(path_1.join(path_2.ROOT, './tsdoc', f));
        const r = md.render(b.toString());
        let fname = f.split('.md')[0] + '.html';
        fs_1.writeFileSync(path_1.join(path_2.ROOT, './tsdoc', fname), r);
    });
});
//# sourceMappingURL=parsemd.js.map