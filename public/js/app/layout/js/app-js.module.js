define(['utils/routerHelper','layout/js/js-routes'],function(routerHelper,routes){
    var app = angular.module("js",[]);
    routerHelper.call(app,routes);
    return  app;
})