define(function(require,exports,module){
    module.exports = [
      {
        "stateName": "css",
        "urlPrefix": "/css",
        "type": "ngload",
        "src": "/js/app/layout/css/app-css.module.js"
      },
      {
        "stateName": "js",
        "urlPrefix": "/js",
        "type": "ngload",
        "src": "/js/app/layout/js/app-js.module.js"
      }
    ]
})