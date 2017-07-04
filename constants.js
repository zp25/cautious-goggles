const HTMLMINIFIER = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const PATHS = {
  root: './',
  html: {
    src: 'app/**/*.html',
    dest: 'dist',
  },
  styles: {
    src: 'app/styles/**/*.{scss,css}',
    tmp: '.tmp/styles',
    dest: 'dist/styles',
  },
  scripts: {
    src: 'app/scripts/**/*.js',
    // browserify
    entries: {
      index: 'app/scripts/index.js',
      legacy: 'app/scripts/legacy.js',
    },
    // concat
    concat: [],
    // production不使用
    watch: [
      'app/scripts/misc/dev.js',
    ],
    tmp: '.tmp/scripts',
    dest: 'dist/scripts',
  },
  images: {
    src: 'app/images/**/*',
    tmp: '.tmp/images',
    dest: 'dist/images',
  },
  copy: ['app/*', '!app/*.html'],
  clean: ['.tmp', 'dist/*'],
  manifest: './rev-manifest.json',
  assets: ['.tmp', 'app', 'node_modules'],
};

const VENDOR = ['babel-polyfill'];

export {
  HTMLMINIFIER,
  PATHS,
  VENDOR,
};
