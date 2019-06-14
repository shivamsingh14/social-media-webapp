const wiredep = require('wiredep').stream;
const gulp = require('gulp');
const rename = require('gulp-rename');
const inject = require('gulp-inject');

gulp.task('inject', () => gulp.src('./socialMedia/index-base.html')
  .pipe(
    inject(
      gulp.src(
        [
          './socialMedia/app.module.js',
          './socialMedia/**/*.js',
          './socialMedia/**/*.css',
          '!./socialMedia/bower_components/**/*',
        ],
        {
          read: false,
        },
      ),
      {
        relative: true,
      },
    ),
  )
  .pipe(wiredep({ devDependencies: true }))
  .pipe(rename('index.html'))
  .pipe(gulp.dest('./socialMedia')));

gulp.task('default', gulp.series('inject'));
