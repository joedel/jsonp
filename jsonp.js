;(function(exports) {

  var randomNameGenerator = function() {
    return "a" + Math.floor(Math.random() * 100000000);
  };

  var addCallbackToUrl = function(url, callbackParamName, callbackFunctionName) {
    return url +
      (url.indexOf("?") === -1 ? "?" : "") +
      "&" +
      callbackParamName +
      "=" +
      callbackFunctionName;
  };

  var defineCallback = function(callbackFunctionName, id, fn) {
    exports[callbackFunctionName] = function() {
      fn.apply(null, arguments);
      teardown(id, callbackFunctionName);
    };
  };

  var teardown = function(id, functionName) {
    document.getElementById(id).remove();
    exports[functionName] = undefined;
  };

  var insertScriptElement = function(id, url) {
    var script = document.createElement("script");
    script.setAttribute("id", id);
    script.setAttribute("src", url);
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  var jsonp = function(url, options, fn) {
    if (options instanceof Function) {
      fn = options;
      options = {};
    }

    var id = randomNameGenerator();

    if (options.callbackParamName === undefined) {
      options.callbackParamName = "callback";
    }

    if (options.callbackFunctionName === undefined) {
      options.callbackFunctionName = "jsonp" + id;
    }

    url = addCallbackToUrl(url, options.callbackParamName, options.callbackFunctionName);

    defineCallback(options.callbackFunctionName, id, fn);
    
    insertScriptElement(id, url);
  };

  exports.JSONP = jsonp;
}(this));