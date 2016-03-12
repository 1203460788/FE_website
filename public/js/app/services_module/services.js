define(["angular"],function(){
    var appServices = angular.module("app.services",[])
    .config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            function( $controllerProvider, $compileProvider, $filterProvider, $provide){
                appServices.controller = $controllerProvider.register;
                appServices.directive  = $compileProvider.directive;
                appServices.filter     = $filterProvider.register;
                appServices.factory    = $provide.factory;
                appServices.service    = $provide.service;
            }
    ]);
    return appServices;
})