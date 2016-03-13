define([AppConfig.appPath+"layout/js/app-js.module.js"],function(module){
    module.controller('jsCtrl', ['$scope', '$stateParams',function($scope,$stateParams){
        console.log($stateParams.type);
        $scope.name=$stateParams.type||"All";
    }])
})