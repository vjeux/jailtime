require('./jailtime.js')(function(pass, call) {
  console.log([call.module, call.name, call.arguments]);
  return pass;
});

var file = require('fs').readFileSync('jailtime.js', 'utf8');
