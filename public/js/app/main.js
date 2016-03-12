;(function(win){
  	var storageApp = {
        appPath:"/js/app/",
        jsPath:"/js/"
  	};
  	window.storageAppConfig = storageApp;
})(window);

require.config({
  	baseUrl:"/js/app/",
  	waitSeconds: 100,
  	paths: {
  		"components":storageAppConfig.jsPath+"ngComponents",
  		"directives":storageAppConfig.jsPath+"ngDirectives",
  		"filters":storageAppConfig.jsPath+"ngFilters",
  		"services":storageAppConfig.jsPath+"ngServices",
  		"utils":storageAppConfig.jsPath+"ngUtils",

		"libPath":storageAppConfig.jsPath+"libs",
		"angularAMD": storageAppConfig.jsPath+"libs/angularAMD",
		"ngload": storageAppConfig.jsPath+"libs/ngload",
		"angular": storageAppConfig.jsPath+"libs/angular",
        "angular-bootstrap": storageAppConfig.jsPath+"libs/ui-bootstrap-tpls",
		"angular-ui-router": storageAppConfig.jsPath+"libs/angular-ui-router",
		"ui-router-extras-core": storageAppConfig.jsPath+"libs/ct-ui-router-extras.core",
		"ui-router-extras-statevis": storageAppConfig.jsPath+"libs/ct-ui-router-extras.statevis",
		"ui-router-extras-sticky": storageAppConfig.jsPath+"libs/ct-ui-router-extras.sticky",
		"ui-router-extras-future": storageAppConfig.jsPath+"libs/ct-ui-router-extras.future"
  	},
  	shim: {
		"angular": { exports: "angular" },
        "angular-bootstrap":{
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
  	deps: ["storage"]
});
