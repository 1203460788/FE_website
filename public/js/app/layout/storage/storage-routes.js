define(function(require){
    var basePath = {
            storage:storageAppConfig.appPath+'layout/storage/',
            layout:storageAppConfig.appPath+"layout/"
        };

    return {
        routers:{
            "storage":{
                url:"/storage",
                dependencies:[
                    basePath.storage+"storage.controller.js"
                ],
                views:{
                    "":{
                        templateUrl:basePath.layout+"layout.html",
                    },
                    "header@storage":{
                        templateUrl:basePath.layout+"header.html",
                        controller:require("layout/layout")
                    },
                    "content@storage":{
                        templateUrl:basePath.storage+"storage.html",
                        controller:"storageCtrl"
                    }
                }
            }
        }
    }
})