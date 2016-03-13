define(function(require){
    var basePath = {
            js:AppConfig.appPath+'layout/js/',
            layout:AppConfig.appPath+"layout/"
        };

    return {
        routers:{
            "js":{
                url:"/js",
                sticky: true,
                dependencies:[
                    basePath.js+"jsSubNavigator.controller.js",
                    basePath.js+"js.controller.js"
                ],
                views:{
                    "":{
                        templateUrl:basePath.layout+"layout.html",
                    },
                    "header@js":{
                        templateUrl:basePath.layout+"header.html",
                        controller:require("layout/layout")
                    },
                    "subnavigator@js":{
                        templateUrl:basePath.js+"subNavigator.html",
                        controller:"jsSubNavigatorCtrl"
                    },
                    "content@js":{
                        templateUrl:basePath.js+"js.html",
                        controller:"jsCtrl"
                    }
                }
            },
            "js.detail":{
                url:"/:type",
                dependencies:[
                    basePath.js+"js.controller.js"
                ],
                views:{
                    "content@js":{
                        templateUrl:basePath.js+"js.html",
                        controller:"jsCtrl"
                    }
                }
            }
        }
    }
})