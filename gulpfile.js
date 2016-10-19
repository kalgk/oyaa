var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    cleanCss = require("gulp-clean-css"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyHtml = require("gulp-minify-html"),
    browserSync = require("browser-sync"),
    jshint = require("gulp-jshint"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    del = require('del');
//获取配置
var config = require("./config.js");

//压缩js文件
gulp.task("uglify",function(){
    gulp.src(config.srcPath.js)
    .pipe(jshint())
    .pipe(jshint.reporter()) // 输出检查结果
    .pipe(uglify({
        // mangle: false, //不简化命名
        // output : {
        //     beautify : true //美化格式
        // }
    }))
    .pipe(gulp.dest(config.distPath.js))
    .pipe(browserSync.stream());
});

//压缩css文件
gulp.task("cleanCss",function(){
    gulp.src(config.srcPath.css)
    .pipe(cleanCss({
        keepBreaks : true //保持换行
    }))
    .pipe(gulp.dest(config.distPath.css));
})

//合并压缩js文件
gulp.task("concat",function(){
    // del("dist/js/all*.js",{dryRun: true}).then(paths => {
    //     console.log('Deleted files and folders:\n', paths.join('\n'));
    // });
    gulp.src(config.srcPath.js)
    .pipe(jshint())
    .pipe(jshint.reporter()) // 输出检查结果
    .pipe(concat("all.js"))
    .pipe(gulp.dest(config.distPath.js))
    .pipe(uglify())
    .pipe(rename("all.min.js"))
    .pipe(gulp.dest(config.distPath.js));
})

//压缩html文件
gulp.task("minifyHtml",function(){
    gulp.src(config.srcPath.html)
    .pipe(minifyHtml())
    .pipe(gulp.dest(config.distPath.html))
    .pipe(browserSync.stream());
})

//测试js文件
gulp.task("jshint",function(){
    gulp.src(config.srcPath.js)
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
})

//编译sass文件
gulp.task("sass",function(){
    gulp.src(config.srcPath.sass)
    // .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compact' //compressed,compact,expanded,nested
    }).on('error', sass.logError))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.distPath.css))
    .pipe(sass({
        outputStyle: 'expanded' //compressed,compact,expanded,nested
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.srcPath.style))
    .pipe(browserSync.stream());
})

//压缩图片
gulp.task("imagemin",function(){
    gulp.src(config.srcPath.images)
    .pipe(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        use : [pngquant()] // 使用pngquant压缩png图片
    }))
    .pipe(gulp.dest(config.distPath.images))
    .pipe(browserSync.stream());
})

//自动刷新
gulp.task("server",function(){
    browserSync.init(config.watchtPath,{
        server : config.server
    });
    gulp.watch(config.srcPath.html,["minifyHtml"]);
    gulp.watch(config.srcPath.sass,["sass"]);
    gulp.watch(config.srcPath.js,["uglify"]);
    gulp.watch(config.srcPath.css,["cleanCss"]);
    gulp.watch(config.srcPath.images,["imagemin"]);
    // gulp.watch(config.srcPath.html).on('change', browserSync.reload);
})

//默认任务
gulp.task("default",function(){
    gulp.start("minifyHtml","sass","uglify","imagemin","server");
})