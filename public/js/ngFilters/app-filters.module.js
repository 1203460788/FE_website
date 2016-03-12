define(["require","angular"], function(require,ng) { 
    var module = angular.module('app.filters',[]);
    
    module.filter("decode_html",['$filter',function($filter) {
        
        var decodeHtml = function(text) {
     
            return !!text ? text
                .replace(/&amp;/g, "&")
                .replace(/&gt;/g, ">")
                .replace(/&lt;/g, "<")
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'") : text;
        };
        return decodeHtml;
    }]);

    //use like this
    //{{conversion(2048*2048*2048*1024*1024,{startUnit:"byte"})}}
    //{{2048*2048*2048*1024*1024|conversion:({startUnit:"KB",endUnit:"GB"})}}
    
    module.filter("unit_conversion",function(){
        return function conversion(byteSize,opt){
            var unit = ["BYTE","KB","MB","GB","TB"];
            var start = 0,end = unit.length-1;

            function unit_conversion(byteSize){
                if(byteSize>=1024&&start<end){
                    start++;
                    byteSize = byteSize/1024;
                    return unit_conversion(byteSize) //arguments.callee(byteSize);
                }
                return byteSize;
            }
            if(opt.startUnit){
                start = unit.indexOf(opt.startUnit.toUpperCase());
            }
            if(opt.endUnit){
                end = unit.indexOf(opt.endUnit.toUpperCase());
            }
            if(!opt.need_not_unit){
                return unit_conversion(byteSize)+unit[start];
            }else{
                return unit_conversion(byteSize);
            }
        }
    })
    
    module.filter('trustAsHtml', ['$sce',function($sce) {
        return function(html) {
            return $sce.trustAsHtml(html);
        };
    }]);
    return module;
});