define([storageAppConfig.appPath+"layout/storage/app-storage.module.js"],function(module){
    console.log(111);
    module.controller('storageCtrl', ['$scope', function($scope){
        console.log(111);
        $scope.name="zhangsan";
    }])
})