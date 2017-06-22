'use strict';

exports.getByBin = function(args, res, next) {
  /**
   * looks up an art for an specific Bin Number
   *
   * bin String 
   * returns inline_response_200_2
   **/
  var examples = {};
  examples['application/json'] = {
  "inicialBin" : 1.3579000000000001069366817318950779736042022705078125,
  "finalBin" : 1.3579000000000001069366817318950779736042022705078125,
  "active" : true,
  "id" : "aeiou",
  "artUrl" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

