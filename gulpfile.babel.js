import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import autoPreFixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import ghPages from "gulp-gh-pages";
import browserify from "browserify";
import tsify from "tsify";
import vinylSourceStream from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import sourceMaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import GulpUglify from "gulp-uglify";

const sass = require("gulp-sass")(require("sass"));

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "dist",
  },
  img: {
    src: "src/image/*",
    dest: "dist/img",
  },
  sass: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "dist/css",
  },
  ts: {
    watch: "src/ts/*.ts",
    src: "src/ts/main.ts",
    dest: "dist",
  },
};

const pug = () => {
  return gulp
    .src(routes.pug.src)
    .pipe(gulpPug())
    .pipe(gulp.dest(routes.pug.dest));
};

const img = () => {
  return gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));
};
const styles = () => {
  return gulp
    .src(routes.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoPreFixer({
        cascade: false,
      })
    )
    .pipe(csso())
    .pipe(gulp.dest(routes.sass.dest));
};

//Reference: https://jedidev.tistory.com/21

const bundler = () => {
  return browserify({
    basedir: ".",
    debug: true,
    entries: [routes.ts.src],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle();
};
const tsToJs = () => {
  return bundler()
    .pipe(vinylSourceStream("bundle.js"))
    .pipe(buffer())
    .pipe(sourceMaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    );
};
const ts = () => {
  return tsToJs()
    .pipe(GulpUglify())
    .pipe(sourceMaps.write("./"))
    .pipe(gulp.dest(routes.ts.dest));
};

const clean = () => del(["dist", ".publish"]);

const webserver = () =>
  gulp.src("dist").pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.sass.watch, styles);
  gulp.watch(routes.ts.watch, ts);
};

const gh = () => gulp.src("dist/**/*").pipe(ghPages());

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, ts]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);
