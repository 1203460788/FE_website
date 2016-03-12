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
                    "header":{
                        templateUrl:basePath.layout+"layout.html",
                        controller:require("app/layout/layout")
                    },
                    "content":{
                        templateUrl:basePath.storage+"storage.html",
                        controller:"storageCtrl"
                    }
                }
            }
        }
    }
})