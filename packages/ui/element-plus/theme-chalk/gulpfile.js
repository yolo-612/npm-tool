var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('build', () => {
  return gulp.src(['../style/common.scss'])
            .pipe(sass().on('error', sass.logError)).pipe(gulp.dest('../dist/css/'));
});
