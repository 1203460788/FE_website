define(["angular",,"angular-bootstrap"], function(ng) {
    var module=ng.module("app.utils",["ui.bootstrap"]);
    module.factory('random', [function(){
        return function (){
            return Math.random();
        };
    }]);
    return module;
});