define(['utils/routerHelper','layout/storage/storage-routes'],function(routerHelper,routes){
    var app = angular.module("storage",[]);
    routerHelper.call(app,routes);
    return  app;
})