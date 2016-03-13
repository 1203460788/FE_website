define(["angular","utils/routerHelper"],function(angular,routerHelper){
    var appServices = angular.module("app.services",[]);
    routerHelper.call(appServices);
    return appServices;
})