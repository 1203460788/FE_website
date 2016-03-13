define(['utils/routerHelper','layout/css/css-routes'],function(routerHelper,routes){
    var app = angular.module("vm",[]);
    routerHelper.call(app,routes);
    return app;
})