var isInitialized = false;
module.exports = function(jailFn) {
  if (isInitialized || typeof jailFn !== "function") {
    return;
  }
  isInitialized = true;
  var pass = {};
  var error = Error;

  function jail(module, obj) {
    Object.keys(obj).forEach(function(name) {
      var value = obj[name];
      if (typeof value === "function") {
        obj[name] = function() {
          var stack = new error().stack;
          var isNodeInternal = !(stack
            .split('\n')[2] || "()")
            .split('(').slice(-1)[0]
            .startsWith('/');

          if (isNodeInternal) {
            return value.apply(this, arguments);
          }

          var result = jailFn(pass, {module, name, arguments, this: this, stack});
          if (result === pass) {
            return value.apply(this, arguments);
          } else {
            return result;
          }
        }
      }
    })
  }

  function jailRequire(name) {
    jail(name, require(name));
  }

  jail('process', process);
  jailRequire('vm');
  jailRequire('fs');
  jailRequire('v8');
  jailRequire('child_process');
  jailRequire('cluster');
  jailRequire('http');
  jailRequire('net');
  jailRequire('readline');
  jailRequire('tls');
  jailRequire('dgram');
  jailRequire('child_process');
}
