global.REQUIRE=function REQUIRE(path){
  return require('../'+path)
}
const RUN = require('../src/server/master')
RUN()