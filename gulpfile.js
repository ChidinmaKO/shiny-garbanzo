const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const stream = browserSync.stream;

const $ = gulpLoadPlugins();

const paths = {
  source: {
    // scripts: [
    //   'static/js/src/main.js',
    // ],
    styles: [
      'styles/*.scss'
    ],
    templates: ['*.html']
  },
  target: {
    //scripts: 'static/js',
    styles: 'dist/css',
    sourcemaps: './maps',
  }
};

gulp.task('styles', () => {
  gulp.src(paths.source.styles)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.concat('app.css'))
    .pipe($.autoprefixer({browsers: ['last 2 versions', '> 1%', 'Firefox ESR']}))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.styles))
    .pipe(stream());
});

gulp.task('scripts', () => {
  gulp.src(paths.source.scripts)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.babel())
    .pipe($.uglify())
    .pipe($.sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.scripts))
    .pipe(stream());
});



// Static server
gulp.task('serve', ["styles"] , function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(paths.source.styles, ['styles']);
  gulp.watch(paths.source.templates).on('change', reload);
});


gulp.task('default', ['styles', 'serve']);