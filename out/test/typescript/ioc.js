"use strict";
var TestIoc;
(function (TestIoc) {
    class Engine {
        constructor() {
            this.make = '本田发动机';
        }
    }
    class Tires {
        constructor() {
            this.make = '法国米其林';
        }
    }
    class Service {
        constructor() {
            this.count = 0;
        }
        add() {
            this.count += 1;
        }
        getCount() {
            return this.count;
        }
    }
    class Car {
        constructor(engine, tires, service) {
            this.engine = engine;
            this.tires = tires;
            this.service = service;
            this.make = '冠道';
            this.service.add();
        }
        drive() {
            console.log(`你正在驾驶本田${this.make}`);
        }
    }
    function main() {
        const service = new Service();
        const car1 = new Car(new Engine(), new Tires(), service);
        const car2 = new Car(new Engine(), new Tires(), service);
        const count = service.getCount();
        console.log(count);
        car2.drive();
    }
    main();
})(TestIoc || (TestIoc = {}));
//# sourceMappingURL=ioc.js.map