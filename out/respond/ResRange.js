var fs = require('fs');
function parseRange(range, size) {
    //目前只处理第一个分段
    //必须格式: bytes=0-10
    //比如说 length=10, 你只能读取0-9的范围
    //读取包含起始位置和结束位置字节
    //当前字节，start===end
    var r0 = range.match(/^bytes=(\d+)-(\d+)$/);
    if (!r0)
        return null;
    var start = parseInt(r0[1]);
    var end = parseInt(r0[2]);
    if (start > end)
        return null;
    if (end >= size)
        return null;
    return { start: start, end: end };
}
function ResRange(req, res) {
    var absolutePath = req.absolutePath;
    var size = req.stats.size;
    //拿到范围，解析范围
    var range = parseRange(req.headers['range'], size);
    //判断范围是否存在
    if (range) {
        var start = range.start, end = range.end;
        res.setHeader('Content-Range', "bytes " + start + "-" + end + "/" + size);
        res.setHeader('Content-Length', (end - start + 1));
        var stream = fs.createReadStream(absolutePath, { start: start, end: end });
        res.writeHead(206, 'Partial Content');
        stream.pipe(res);
        process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_RANGE', msg: absolutePath });
    }
    else {
        res.removeHeader('Content-Length');
        res.setHeader('Content-Range', "bytes=*/" + size);
        res.writeHead(416, 'Request Range Not Satisfiable');
        res.end();
        process.send({ type: 'INFO', pid: process.pid, msgtype: '416', msg: absolutePath });
    }
}
module.exports = {
    ResRange: ResRange
};
//# sourceMappingURL=ResRange.js.map