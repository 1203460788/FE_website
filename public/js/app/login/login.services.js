define(["services_module/services"],function(module){
    module.factory('loginSrv', ['httpUtils', function(httpUtils){
        function random(){
            return Math.random();
        }
        return {
            random:random
        }
    }])
})