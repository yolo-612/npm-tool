var gulp = require('gulp');
var stream = require('stream');
var fs = require('fs');
var path = require('path');

const ProjectDir = process.cwd();

function gen(){
  return new stream.Transform({
    objectMode: true,
    transform(file, _encoding, callback) {
      const filePathArr = file.path.split(path.sep);
      const filename = filePathArr.pop();
      const componentsPath = filePathArr[filePathArr.length - 1];

      require('npm-sass')(file.path, function (err, result) {
        let localeDir = '';
        if (err) {
          console.error(err);
          return;
        }
        // 基础组件
        if (componentsPath === 'components') {
          localeDir = '/components';
        }
        // 业务组件
        if (componentsPath === 'packages') {
          localeDir = '/packages';
        }
        // if (!['vars.scss'].includes(filename)) {
          if (!fs.existsSync(path.resolve(ProjectDir + localeDir))) {
            fs.mkdirSync(path.resolve(ProjectDir + localeDir), {
              recursive: true
            });
          }
          fs.writeFileSync(
            path.resolve(
              ProjectDir + localeDir + `/${filename.replace('.scss', '.css')}`
            ),
            result.css.toString()
          );
        // }
      });
      callback(null, file);
    }

  })
}

gulp.task('build', () => {
  return gulp.src(['../style/**/*.scss']).pipe(gen());
});
