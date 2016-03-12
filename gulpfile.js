var gulp = require('gulp'); 
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var rjs = require('gulp-r');//require('gulp-requirejs');//require('gulp-r');
var rename = require("gulp-rename");  
var concat = require('gulp-concat');
var jshint = require('gulp-jshint'); 
var htmlReporter = require('gulp-jshint-html-reporter');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var angularTemplates = require('gulp-angular-templatecache')
var less = require('gulp-less');
var scss = require('gulp-scss');
var path = require('path');
var gulpFilter = require('gulp-filter');
var gulpIgnore = require('gulp-ignore');
var clean = require('gulp-clean');
var gulpSSH = require('gulp-ssh');
var zip = require('gulp-zip');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var fs= require('fs');


var buildPath="static/";
var remotePath="/opt/galaxy-portal/webroot/app/foam/static/"
var myGulpSSH = new gulpSSH({
        ignoreErrors: false,
        sshConfig: {
            host: '10.100.125.23',
            port: 22,
            username: 'root',
            password:'deepnet'
            //privateKey: require('fs').readFileSync('/Users/zensh/.ssh/id_rsa')
        } 
});

gulp.task('lint',function(){
    return gulp.src('public/js/*.js')
               .pipe(jshint())
               .pipe(jshint.reporter(htmlReporter,{
                 filename:__dirname + '/jshint-output.html'
               }));
});

/*清除*/
gulp.task('clean',function(cb){
     del([
        'bower_components',
        'public/js/libs',
        'public/js/app.min.js',
        'public/js/app-build'],cb);
});
/**************************Lenovo Framework Section Start***************************************/
gulp.task('copyLenovoNGFiles',[],function(){
    var filter = gulpFilter(['ng**/**']);
    return  gulp.src(["bower_components/AngularFramework/**/*"]).pipe(filter)
                .pipe(gulp.dest('public/js'));
})

gulp.task('copyLenovoFontFiles',[],function(){
    var filter = gulpFilter(['fonts/**']);
    return  gulp.src(["bower_components/AngularFramework/**/*"]).pipe(filter)
                .pipe(gulp.dest('public/'));
})

gulp.task('copyLenovoExtLibFiles',[],function(){
    var filter = gulpFilter(['ext_libs/**']);
    return  gulp.src(["bower_components/AngularFramework/**/*"]).pipe(filter)
                .pipe(gulp.dest('./'));
})

gulp.task('copyLenovoCssFiles',[],function(){
    var filter = gulpFilter(['css/**']);
    return  gulp.src(["bower_components/AngularFramework/**/*"]).pipe(filter)
                .pipe(gulp.dest('public/'));
})

gulp.task('copyLenovoThemeFiles',[],function(){
    var filter = gulpFilter(['css/**']);
    var path = "./scss/theme/";
    if(fs.existsSync("./scss/ec2")){
        path = "./scss/ec2/";
    }
    return  gulp.src(["bower_components/AngularFramework/scss/theme/*"])
                .pipe(gulp.dest(path));
})

/**************************Lenovo Framework Section End***************************************/
gulp.task('copyBootstrapLess',[],function(){
    

    return gulp.src('bower_components/bootstrap/less/**/*.less')
    .pipe(gulp.dest(path.join(__dirname, 'less', 'bootstrapLess')));
})

gulp.task('compileBootstrapLess',function(){
    return gulp.src(['less/bootstrapLess/bootstrap.less'])
               .pipe(less()) 
               .pipe(gulp.dest("css")); 
});

gulp.task('compileScss',[],function(){
    return gulp.src('scss/*.scss')
    .pipe(plumber({errorHandler:errorHandler}))
    .pipe(compass({
      css: 'css',
      sass: 'scss'
    }))
    .on('error',function(error){
      console.log("compileScss.error = " + error);
      this.emit('end');
    })
});

// 合并Css文件
gulp.task('concatCss',['cleanCss', 'copyBootstrapLess', 'compileBootstrapLess','compileScss'],function(){

   return gulp.src('css/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload())
});

gulp.task("watchCss",function(){
    gulp.watch(['scss/*.scss','scss/**/*.scss'], ['concatCss']);
});

gulp.task("connect",function(){
  connect.server({
    root:'app',
    livereload:true
  })
});
gulp.task("default",["connect",'watchCss']);






// 删除编译文件
gulp.task('cleanCss',function(cb){
    del(['css/*', 'public/css/*'], cb);
});

/*安装依赖*/
gulp.task('addCompToLibs',['cleanLibs'],function(){
    return  gulp.src(mainBowerFiles({'debugging':true}))
                .pipe(gulp.dest('public/js/libs'));
})  

/*添加所有包*/
gulp.task('addLibs',['addCompToLibs'/*,'copyLenovoNGFiles','copyLenovoFontFiles','copyLenovoExtLibFiles','copyLenovoCssFiles','copyLenovoThemeFiles'*/],function(){
    return gulp.src(["ext_libs/**/*.*","ext_libs/*.*"])
           .pipe(rename({dirname: ''}))
           .pipe(gulp.dest('public/js/libs'));
});

/*清除*/
gulp.task('cleanLibs',function(cb){
     del([ 
        'public/js/libs'],cb);
});

/*编译scss文件*/


/*编译less*/
gulp.task('less',function(){
    return gulp.src(['less/ng-grid/main.less','less/ng-grid/**/*.less','less/ng-grid/ui-grid-codes.css'])
               .pipe(less()) 
            //   .pipe(minifyCSS())
               .pipe(concat('ui-grid.css')) 
               .pipe(gulp.dest("./public/js/libs")); 
});

gulp.task('watchLess', function() {
  gulp.watch(['less/**/*.less'], ['less']);
});

gulp.task('watch', function() {
  gulp.watch(['scss/*.scss','scss/**/*.scss'], ['compass']);
});

// grid Templates
gulp.task('templates',function(){
    return gulp.src('public/js/app/tpl/components/grid/*.html')
               .pipe(angularTemplates({
                root:'/js/app/tpl/components/grid/',
                module:'app.components.grid',
          //    templateHeader:'(function(){',
          //    templateFooter:'})();',
         //         moduleSystem:'RequireJS'//''Browserify
                }))
               .pipe(gulp.dest('public/js/app/components/'))
});


gulp.task('upload',['zipPack'],function(){
     return gulp.src('./upload.zip')
                .pipe(myGulpSSH.sftp('write', remotePath+'upload.zip'));
});

gulp.task('shell',['upload'], function () {
  return myGulpSSH
    .shell(['rm -rf '+remotePath+'/css', 
        'rm -rf '+remotePath+'/fonts', 
        'rm -rf '+remotePath+'/img', 
        'rm -rf '+remotePath+'/js',
        'rm -rf '+remotePath+'/testdata',
        'cd '+remotePath,
        'unzip upload.zip',
        'rm -rf '+remotePath+'upload.zip'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'));
});

gulp.task('zipPack',['copyFiles'],function(){
    console.log(path.join("./"));
    return gulp.src(buildPath+"**")
               .pipe(zip('upload.zip'))
               .pipe(gulp.dest('./'));
});

/*generation target files*/
gulp.task('target', ['copyFiles'],function (cb) {  
    del([buildPath+'testdata'],cb);
});

gulp.task('replaceConfig',['copyFiles'],function(){
    gulp.src("public/js/config-product.js")
        .pipe(rename("config.js"))
        .pipe(gulp.dest(buildPath+"js/"));
});

gulp.task('copyFiles',['cleanStatic'],function(){ 
    return gulp.src(['public/**'])
        .pipe(gulpIgnore.exclude('**/public/*.js'))
        .pipe(gulp.dest(buildPath));
});

gulp.task('cleanStatic',function(cb){
    return del([buildPath,'./upload.zip'],cb);
});


gulp.task('watchFile', function() {
  gulp.watch(['public/**'], ['shellForModify']);
});



gulp.task('uploadModify',['cleanStatic'],function(){
    return gulp.src('public/**')
        .pipe(plumber({errorHandler:errorHandler}))
        .pipe(watch('public/**')) 
        .pipe(gulp.dest(buildPath));
});

gulp.task('uploadForModify',['zipPackForModify'],function(){
     return gulp.src('./upload.zip')
                .pipe(myGulpSSH.sftp('write', remotePath+'upload.zip'));
});

gulp.task('shellForModify',['uploadForModify'], function () {
  return myGulpSSH
    .shell(['cd '+remotePath,
        'unzip upload.zip',
        'rm -rf '+remotePath+'upload.zip'], {filePath: 'shell.log'})
    .pipe(gulp.dest('logs'));
});

gulp.task('zipPackForModify',['uploadModify'],function(){
    console.log(path.join("./"));
    return gulp.src(buildPath+"**")
               .pipe(zip('upload.zip'))
               .pipe(gulp.dest('./'));
});

function errorHandler(e){
    gutil.beep(); 
    gutil.log(e);
}