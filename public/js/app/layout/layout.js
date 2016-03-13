define(["layout/layout.services"],function(){
    return ['$scope','layoutSrv',function($scope,layoutSrv){
        console.log(layoutSrv.random());
        $scope.vm = {};
        $scope.vm.navigators = [
            {"ui-sref":"js","stateName":"js",href:"#/js",text:"Javascript"},
            {"ui-sref":"css","stateName":"css",href:"#/css",text:"CSS"}
        ]
    }]
})