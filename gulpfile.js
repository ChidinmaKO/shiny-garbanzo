const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const reload = browserSync.reload;
const stream = browserSync.stream;

const $ = gulpLoadPlugins();

const paths = {
  source: {
    scripts: [
      'scripts/*.js',
    ],
    styles: [
      'styles/*.scss'
    ],
    templates: ['*.html']
  },
  target: {
    scripts: 'dist/js',
    styles: 'dist/css',
    sourcemaps: './maps',
  }
};

gulp.task('styles', () => {
  gulp.src(paths.source.styles)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed', includePaths: require('node-normalize-scss').includePaths}).on('error', $.sass.logError))
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
    //.pipe($.babel())
    .pipe($.uglify())
    .pipe($.sourcemaps.write(paths.target.sourcemaps))
    .pipe(gulp.dest(paths.target.scripts))
    .pipe(stream());
});

gulp.task('font', function() {
  return gulp.src('chidinma/assets/font/**/*.{ttf,otf,woff}')
  .pipe(gulp.dest('dist/font'));
})


// Static server
gulp.task('serve', ["styles", "scripts", "font"] , function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(paths.source.styles, ['styles']);
  gulp.watch(paths.source.templates).on('change', reload);
  gulp.watch(paths.source.scripts, ['scripts']);
  gulp.watch(paths.source.font, ['assets/font']);

});


gulp.task('default', ['scripts', 'styles', 'font', 'serve']);