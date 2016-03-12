define(['utils/routerHelper','layout/vm/vm-routes'],function(routerHelper,routes){
    var app = angular.module("vm",[]);
    routerHelper.call(app,routes);
    return app;
})