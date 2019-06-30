function bufferSplit(buffer, spl) {
    const result = [];
    let offset = 0;
    let index = 0;
    while ((index = buffer.indexOf(spl, offset)) !== -1) {
        result.push(buffer.slice(offset, index));
        offset = index + spl.length;
    }
    result.push(buffer.slice(offset));
    return result.filter(b => b.byteLength);
}
const buffer = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n');
const results = bufferSplit(buffer, '\r\n');
for (let b of results) {
    console.log(b.toString());
}
//# sourceMappingURL=bufferSplit.js.map