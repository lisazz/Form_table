var gulp = require("gulp");
var rev = require("gulp-rev");
var imagemin = require("gulp-imagemin");
var revCollector = require("gulp-rev-collector");
var runSequence = require("run-sequence");
var rename = require("gulp-rename");

// css生成文件hash编码并生成 rev-manifest.json文件对照映射
gulp.task("css",function(){
  gulp.src("./css/bootstrap.css")
    .pipe(rev())
    .pipe(gulp.dest("./release/css"))
    .pipe(rev.manifest())
    .pipe(rename("css-manifest.json"))
    .pipe(gulp.dest("./release/rev"))
})
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task("js",function(){
  gulp.src("./js/*")
    .pipe(rev())
    .pipe(gulp.dest("./release/js"))
    .pipe(rev.manifest())
    .pipe(rename("js-mainfest.json"))
    .pipe(gulp.dest("./release/rev"));
});

// Html 更换 js 文件版本
gulp.task("rev",function(){
  gulp.src(["./release/**/*.json","./index.html"])
    .pipe(revCollector())
    .pipe(gulp.dest("./release"));
})
//开发构建
  gulp.task('dev', function (done) {
  condition = false;
  runSequence(
  ['js'],
  ['rev'],
  done);});
  gulp.task('default', ['dev']);
