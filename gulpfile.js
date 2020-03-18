const gulp = require('gulp');
const rimraf = require('rimraf');// 只是删除文件以及文件夹 我们没必要去用一个 gulp 插件，直接用原生的 node 模块
const { src, dest, task, series} = gulp;
const rename =require('gulp-rename');

// 定义路径对象
const srcRoot = 'src/'; // 源目录文件夹
const distRoot = 'dist/'; // 输出目录
const distRootSrc = distRoot + 'src/'; // 输出目录 src
const paths = {
  src: {
    components: srcRoot + 'components/',
    icons: srcRoot + 'icons/',
    themes: srcRoot + 'themes/',
    utils: srcRoot + 'utils/',
  },
  dest: {
    components: distRootSrc + 'components/',
    icons: distRootSrc + 'icons/',
    themes: distRootSrc + 'themes/',
    utils: distRootSrc + 'utils/',
  }
};

/**
 * 删除打包目录
 */
task('clean', (cb) => {
  rimraf('dist/src', cb);
});

/**
 * 拷贝组件
 */
task('components', () => {
  return src(paths.src.components + '**/*.*')
    .pipe(dest(paths.dest.components));
});

/**
 * 拷贝 icons
 */
task('icons', () => {
  return src(paths.src.icons + '**/*.*')
    .pipe(dest(paths.dest.icons));
});

/**
 * 拷贝 themes
 */
task('themes', () => {
  return src(paths.src.themes + '**/*.*')
    .pipe(dest(paths.dest.themes));
});

/**
 * 拷贝 utils
 */
task('utils', () => {
  return src(paths.src.utils + '**/*.*')
    .pipe(dest(paths.dest.utils));
});

/**
 * 拷贝 readme.md
 */
task('readme', () => {
  return src('./README.MD')
    .pipe(dest(distRoot));
});

exports.default = series('clean', 'components', 'icons', 'themes', 'utils', 'readme');
