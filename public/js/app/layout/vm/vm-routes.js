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
                    "":{
                        templateUrl:basePath.layout+"layout.html",
                    },
                    "header@vm":{
                        templateUrl:basePath.layout+"header.html",
                        controller:require("layout/layout")
                    },
                    "content@vm":{
                        templateUrl:basePath.vm+"vm.html",
                        controller:"vmCtrl"
                    }
                }
            }
        }
    }
})