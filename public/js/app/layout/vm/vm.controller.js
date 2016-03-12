define([storageAppConfig.appPath+"layout/vm/app-vm.module.js"],function(module){
    console.log(111);
    module.controller('vmCtrl', ['$scope', function($scope){
        console.log(111);
        $scope.name="lisi";
    }])
})