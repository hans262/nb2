"use strict";
function ttt(mok) {
    if (typeof mok === 'number') {
        mok;
    }
    else if (mok instanceof Date) {
        mok;
    }
}
function isDate(d) {
    return d instanceof Date;
}
function www(mok) {
    if (isDate(mok)) {
        mok;
    }
}
function move(pet) {
    if ('swim' in pet) {
        return pet.swim();
    }
    return pet.fly();
}
//# sourceMappingURL=TypeGuards.js.map