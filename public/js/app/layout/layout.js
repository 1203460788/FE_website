define(["layout/layout.services"],function(){
    return ['$scope','layoutSrv',function($scope,layoutSrv){
        console.log(layoutSrv.random());
        $scope.person ={name:"zhangsan",age:18,gender:"male"}
    }]
})