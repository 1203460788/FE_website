define(["layout/layout.services"],function(){
    return ['$scope','layoutSrv',function($scope,layoutSrv){
        $scope.vm = {};
        $scope.vm.navigators = [
            {"ui-sref":"storage","stateName":"storage",href:"#/storage",text:"JS"},
            {"ui-sref":"vm","stateName":"vm",href:"#/vm",text:"CSS"}
        ]
    }]
})