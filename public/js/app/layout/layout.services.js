define(['angular'],function(angular){
    var module = angular.module("app.services");
    
    module.factory('layoutSrv', ['httpUtils', function(httpUtils){
        function random(){
            return Math.random();
        }
        return {
            random:random
        }
    }])
})