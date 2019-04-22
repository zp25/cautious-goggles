import gulp from 'gulp';
import browserSync from 'browser-sync';
import dotenv from 'dotenv';
import html from './gulpConfig/html';
import {
  images,
  tmpWebp,
  webp,
} from './gulpConfig/images';
import {
  stylelint,
  tmpSass,
  sass,
} from './gulpConfig/styles';
import {
  lint,
  tmpBundleBatch,
  bundle,
  vendor,
} from './gulpConfig/scripts';
import {
  copy,
  clean,
  cleanCache,
} from './gulpConfig/utils';
import { name } from './package.json';

dotenv.config({ silent: true });

const BS = browserSync.create();

// 资源路径
const {
  assets,
  html: htmlPath,
  images: imagePath,
  styles: stylePath,
  includePaths,
  vendor: vendorPath,
  entries,
} = {
  assets: ['.tmp', 'app', 'node_modules'],
  html: 'app/**/*.html',
  images: 'app/images/**/*',
  styles: 'app/styles/**/*.{scss,css}',
  // gulp-sass includePaths
  includePaths: [
    // 'node_modules/normalize.css',
    'node_modules/zp-ui',
  ],
  // scripts
  vendor: ['zp-lib'],
  entries: {
    index: 'app/scripts/index.js',
  },
};

// Tasks
gulp.task('tmpWebp', tmpWebp(BS)(imagePath));
gulp.task('tmpSass', tmpSass(BS)(stylePath, { includePaths }));

gulp.task('tmpBundle', tmpBundleBatch(BS)(entries, { exclude: vendorPath }));

gulp.task('lint', lint(BS));

function server() {
  BS.init({
    notify: false,
    logPrefix: name,
    server: {
      baseDir: assets,
    },
    port: process.env.PORT || 3000,
  });

  gulp.watch(htmlPath).on('change', BS.reload);
  gulp.watch(imagePath, gulp.parallel('tmpWebp'));
  gulp.watch(stylePath, gulp.parallel(stylelint, 'tmpSass'));

  gulp.watch('app/**/*.js', gulp.parallel('lint'));
}

// run scripts, sass first and run browserSync before watch
gulp.task('serve', gulp.series(
  gulp.parallel(
    'tmpWebp',
    'tmpSass',
    'tmpBundle',
  ),
  server,
));

gulp.task('vendor', vendor(vendorPath));
gulp.task('clean:all', gulp.series(clean, 'vendor'));
gulp.task('clean:cache', cleanCache);

const bundleList = Object.entries(entries).map(([key, src]) => (
  bundle(src, `scripts/bundle.${key}.js`, { exclude: vendorPath })
));

// Build production files, the default task
gulp.task('default', gulp.series(
  'clean:all',
  'lint',
  ...bundleList,
  gulp.parallel(
    stylelint,
    sass(stylePath, { includePaths }),
    images(imagePath),
    webp(imagePath),
    copy(),
  ),
  html(htmlPath, {
    searchPath: assets,
    cleanCss: ['normalize.css'],
  }),
));
