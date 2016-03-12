define(["angular"], function(ng) {
    var module=ng.module("app.utils",[]);
    module.factory('random', [function(){
        return function (){
            return Math.random();
        };
    }]);
    return module;
});