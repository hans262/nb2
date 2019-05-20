global.REQUIRE=function REQUIRE(path){
  return require('../'+path)
}
const run = require('../src/server/master')
run()