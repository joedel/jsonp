JSONP
=================

Easily make JSONP requests.

Usage:

    JSONP("http://localhost/api/json?params=things",callbackFunction);
    
JSONP will create a script tag and execute your callback function with the returned data, the script and function are then removed.

If your api forces you to use a custom callback parameter or function name you can pass those in:

    JSONP("http://localhost/api", {callbackParamName: "jsonCallback", callbackFunctionName: "doSomething"}, callbackFunction);
