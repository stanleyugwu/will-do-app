var gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


gulp.task('log', function() {
    console.log("hey there am using gulp for running task")
})


gulp.task("prefix", function() {
    gulp.src("./src/styles/app.css")
        .pipe(
            autoprefixer({
                browsers: ["last 99 versions"],
                cascade: false
            })
        )
        .pipe(gulp.dest("./dist/style/"))
})

gulp.task('conc', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/aos/dist/aos.js', './node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(concat('./src/scripts/libs.conc.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('build', function() {
    return gulp.src(['./src/scripts/libs.conc.js', './src/scripts/mainScript.js', './src/scripts/appscript.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/script/'))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./dist/script/'))
})