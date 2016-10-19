//监听的文件，如果改变，则刷新页面，这些目标文件从src文件夹编译处理过来
var watchPath = [ "dist/*.html", "dist/css","dist/js/*.js"];

//项目的源码，用于编译成目标文件，监听这些文件的变化，如果变化了就再次编译
var srcPath = {
	html : "src/*.html",
	sass : "src/sass/*.scss",
	js : "src/js/*.js",
	css : "src/css/*.css",
	images : "src/images/*.{png,jpg,gif,ico}",
	style : "src/css/"
}

//目标文件的存放目录
var distPath = {
	css : "dist/css/",
	js : "dist/js/",
	images : "dist/images",
	html : "dist/"
}

//服务器的根目录
var server = "./dist/";

//返回给gulpfile.js文件的配置项
module.exports = {
	distPath : distPath,
	watchPath : watchPath,
	srcPath : srcPath,
	server : server
}