define(['utils/routerHelper','app/layout/vm/vm-routes'],function(routerHelper,routes){
    var app = angular.module("vm",[]);
    routerHelper.call(app,routes);
    return app;
})