const { series, src, dest } = require('gulp');
const rimraf = require('gulp-rimraf');

const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const source = 'src';
const dist = 'dist';

const paths = {
  ts: [`${source}/**/*.ts`, `${source}/*.ts`],
};

const clean = () => {
  return src(dist, { allowEmpty: true }).pipe(rimraf({ force: true }));
};

const tsc = () => {
  const project = ts.createProject('tsconfig.json');
  return src(paths.ts, { base: `./${source}` })
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(dist));
};

const copy = () => {
  return src(['node_modules/**/*'], { base: '.' }).pipe(dest(dist));
};

const buildSuccess = (cb) => {
  console.log('BUILD FINISHED SUCCESSFULLY');
  return cb();
};

exports.build = series(clean, tsc, copy, buildSuccess);
