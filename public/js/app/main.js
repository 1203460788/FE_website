;(function(win){
  	var AppConfig = {
        appPath:"/js/app/",
        jsPath:"/js/"
  	};
  	window.AppConfig = AppConfig;
})(window);

require.config({
  	baseUrl:"/js/app/",
  	waitSeconds: 100,
  	paths: {
  		"components":AppConfig.jsPath+"ngComponents",
  		"directives":AppConfig.jsPath+"ngDirectives",
  		"filters":AppConfig.jsPath+"ngFilters",
  		"services":AppConfig.jsPath+"ngServices",
  		"utils":AppConfig.jsPath+"ngUtils",

		"libPath":AppConfig.jsPath+"libs",
		"angularAMD": AppConfig.jsPath+"libs/angularAMD",
		"ngload": AppConfig.jsPath+"libs/ngload",
		"angular": AppConfig.jsPath+"libs/angular",
        "angular-animate": AppConfig.jsPath+"libs/angular-animate",
        "angular-bootstrap": AppConfig.jsPath+"libs/ui-bootstrap-tpls",
		"angular-ui-router": AppConfig.jsPath+"libs/angular-ui-router",
		"ui-router-extras-core": AppConfig.jsPath+"libs/ct-ui-router-extras.core",
		"ui-router-extras-statevis": AppConfig.jsPath+"libs/ct-ui-router-extras.statevis",
		"ui-router-extras-sticky": AppConfig.jsPath+"libs/ct-ui-router-extras.sticky",
		"ui-router-extras-future": AppConfig.jsPath+"libs/ct-ui-router-extras.future"
  	},
  	shim: {
		"angular": { exports: "angular" },
        "angular-bootstrap":{
            deps:["angular"],
            exports:"angular"
        },
        "angular-animate":{
            deps:["angular"],
            exports:"angular"
        },
		"angularAMD": ["angular"],
		"ngload": ["angularAMD"],
		"angular-ui-router": ["angular"],
		"ui-router-extras-core": ["angular"],
		"ui-router-extras-statevis": ["angular", "ui-router-extras-sticky"],
		"ui-router-extras-sticky": ["angular", "ui-router-extras-core"],
		"ui-router-extras-future": ["angular", "ui-router-extras-core"]
  	},
  	deps: ["app"]
});
