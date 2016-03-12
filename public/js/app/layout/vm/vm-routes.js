define(function(require){
    var basePath = {
            vm:storageAppConfig.appPath+'layout/vm/',
            layout:storageAppConfig.appPath+"layout/"
        };

    return {
        routers:{
            "vm":{
                url:"/vm",
                dependencies:[
                    basePath.vm+"vm.controller.js"
                ],
                views:{
                    "header":{
                        templateUrl:basePath.layout+"layout.html",
                        controller:require("app/layout/layout")
                    },
                    "content":{
                        templateUrl:basePath.vm+"vm.html",
                        controller:"vmCtrl"
                    }
                }
            }
        }
    }
})