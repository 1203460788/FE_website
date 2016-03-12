;(function(win){
  	var storageApp = {
        appPath:"/js/app/",
		componentsPath:"./ngComponents",
		directicesPath:"./ngDirectives",
		filtersPath:"./ngFilters",
		servicesPath:"./ngServices",
		utilsPath:"./ngUtils"
  	};
  	window.storageAppConfig = storageApp;
})(window);

require.config({
  	baseUrl:"/js/",
  	waitSeconds: 100,
  	paths: {
  		"components":storageAppConfig.componentsPath,
  		"directives":storageAppConfig.directicesPath,
  		"filters":storageAppConfig.filtersPath,
  		"services":storageAppConfig.servicesPath,
  		"utils":storageAppConfig.utilsPath,

		"libPath":"./libs",
		"angularAMD": "./libs/angularAMD",
		"ngload": "./libs/ngload",
		"angular": "./libs/angular",
		"angular-ui-router": "./libs/angular-ui-router",
		"ui-router-extras-core": "./libs/ct-ui-router-extras.core",
		"ui-router-extras-statevis": "./libs/ct-ui-router-extras.statevis",
		"ui-router-extras-sticky": "./libs/ct-ui-router-extras.sticky",
		"ui-router-extras-future": "./libs/ct-ui-router-extras.future"
  	},
  	shim: {
		"angular": { exports: "angular" },
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
