define(['require','angular','services/app-utils.module'], function(require,ng,module){
    

    module.factory('funcUtils',[function(){ 
            /***WARN: Don't put grid functions in here,please use uigrid-utils.service**/
            var funcs = {
                "setFieldFilter":setFieldFilter,
                "throttle":throttle,
                "debounce":debounce,
                "queryString":queryString,
                "jsonToDataForm":jsonToDataForm,
                "parseQS":parseQS,
                "execParseQS":execParseQS
            };
            
            return funcs;
            
            
            function setFieldFilter(scope){
                scope.maxlen = COMMON_REGEX_PATTERN.MAX_LENGTH;
                scope.minlen = COMMON_REGEX_PATTERN.MIN_LENGTH;
                scope.display_name = COMMON_REGEX_PATTERN.DISPLAY_NAME;
                scope.email = COMMON_REGEX_PATTERN.E_MAIL;
                scope.des = COMMON_REGEX_PATTERN.REGEXP_DESC;
                scope.positive_integer = COMMON_REGEX_PATTERN.POSITIVE_INTEGER;
                scope.max_number = COMMON_REGEX_PATTERN.MAX_NUMBER;
            }

            /**
            * 频率控制函数， fn执行次数不超过 1 次/delay
            * @param fn{Function}     传入的函数
            * @param delay{Number}    时间间隔
            * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
            *                         如果想忽略结束边界上的调用则传入 {trailing:false},
            * @returns {Function}     返回调用函数
            */
            function throttle(fn,delay,options) {
                var wait=false;
                if (!options) options = {};
                return function(){
                    var that = this,args=arguments;
                    if(!wait){
                        if (!(options.leading === false)){
                            fn.apply(that,args);
                        }
                        wait=true;
                        setTimeout(function () {
                            if (!(options.trailing === false)){
                                fn.apply(that,args);
                            }
                            wait=false;
                        },delay);
                    }
                }
            }

            /**
             * 空闲控制函数， fn仅执行一次
             * @param fn{Function}     传入的函数
             * @param delay{Number}    时间间隔
             * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
             *                         如果想忽略结束边界上的调用则传入 {trailing:false},
             * @returns {Function}     返回调用函数
             */
            function debounce(fn, delay, options) {
                console.log(111);
                var timeoutId;
                if (!options) options = {};
                var leadingExc = false;

                return function() {
                    var that = this,
                        args = arguments;
                    if (!leadingExc&&!(options.leading === false)) {
                        fn.apply(that, args);
                    }
                    leadingExc=true;
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    timeoutId = setTimeout(function() {
                        if (!(options.trailing === false)) {
                            fn.apply(that, args);
                        }
                        leadingExc=false;
                    }, delay);
                }
            }
            
            function queryString(data) { 
                var tempArr = []; 
                for (var attr in data){ 
                    tempArr.push(attr+"="+data[attr]);
                }
                return "?" + tempArr.join("&"); 
            }

            function jsonToDataForm(data){
                var tempArr = []; 
                for (var attr in data){ 
                    tempArr.push(attr+"="+data[attr]);
                }
                return tempArr.join("&"); 
            }

            function parseQS(url){
                var resultObj = {}
                if(url.indexOf("?")>=0){

                    var arr = url.split("?")[1].split("&");
                    for(var i=arr.length-1;i>=0;i--){
                        var pairParam = arr[i].split("=");
                        resultObj[pairParam[0]]= pairParam[1]
                    }

                }
                return resultObj;
            }

            function execParseQS(url){
                var tempa=null;
                var reg=/([^=?&]+)=([^=?&]+)/g;
                var resultObj={}
                while( tempa=reg.exec(url)){
                    resultObj[tempa[1]]=tempa[2];         
                }
                
                return resultObj;
            }
        }
    ]);

    //example $debounce http://jsfiddle.net/Warspawn/6K7Kd/ 
    //guide http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
    module.factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',function($rootScope,   $browser,   $q,   $exceptionHandler) {
        var deferreds = {},
            methods = {},
            uuid = 0;

        function debounce(fn, delay, invokeApply) {
            var deferred = $q.defer(),
                promise = deferred.promise,
                skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                timeoutId, cleanup,
                methodId, bouncing = false;

            // check we dont have this method already registered
            angular.forEach(methods, function(value, key) {
                if(angular.equals(methods[key].fn, fn)) {
                    bouncing = true;
                    methodId = key;
                }
            });

            // not bouncing, then register new instance
            if(!bouncing) {
                methodId = uuid++;
                methods[methodId] = {fn: fn};
            } else {
                // clear the old timeout
                deferreds[methods[methodId].timeoutId].reject('bounced');
                $browser.defer.cancel(methods[methodId].timeoutId);
            }

            var debounced = function() {
                // actually executing? clean method bank
                delete methods[methodId];

                try {
                    deferred.resolve(fn());
                } catch(e) {
                    deferred.reject(e);
                    $exceptionHandler(e);
                }

                if (!skipApply) $rootScope.$apply();
            };

            timeoutId = $browser.defer(debounced, delay);

            // track id with method
            methods[methodId].timeoutId = timeoutId;

            cleanup = function(reason) {
                delete deferreds[promise.$$timeoutId];
            };

            promise.$$timeoutId = timeoutId;
            deferreds[timeoutId] = deferred;
            promise.then(cleanup, cleanup);

            return promise;
        }


        // similar to angular's $timeout cancel
        debounce.cancel = function(promise) {
            if (promise && promise.$$timeoutId in deferreds) {
                deferreds[promise.$$timeoutId].reject('canceled');
                return $browser.defer.cancel(promise.$$timeoutId);
            }
            return false;
        };

        return debounce;
    }]); 
});