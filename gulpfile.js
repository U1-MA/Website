const gulp = require('gulp')
const postcss = require('gulp-postcss')
const nunjucks = require('gulp-nunjucks')
const browser = require('browser-sync').create()

const SOURCE = 'src'
const DESTINATION = 'dist'

// STYLES

gulp.task('styles', () => {
	return gulp
		.src(`${SOURCE}/style.css`)
		.pipe(
			postcss([
				require('postcss-import'),
				require('autoprefixer'),
				require('postcss-aspect-ratio-polyfill'),
				require('postcss-csso'),
			])
		)
		.pipe(gulp.dest(DESTINATION))
		.pipe(browser.stream())
})

// HOME

gulp.task('home:english', () => {
	return gulp
		.src(`${SOURCE}/index.njk`)
		.pipe(nunjucks.compile(require(`./${SOURCE}/content/home/en.json`)))
		.pipe(gulp.dest(DESTINATION))
		.pipe(browser.stream())
})

gulp.task('home:russian', () => {
	return gulp
		.src(`${SOURCE}/index.njk`)
		.pipe(nunjucks.compile(require(`./${SOURCE}/content/home/ru.json`)))
		.pipe(gulp.dest(`${DESTINATION}/ru`))
		.pipe(browser.stream())
})

// PRIVACY

gulp.task('privacy:english', () => {
	return gulp
		.src(`${SOURCE}/privacy.njk`)
		.pipe(nunjucks.compile(require(`./${SOURCE}/content/privacy/en.json`)))
		.pipe(gulp.dest(DESTINATION))
		.pipe(browser.stream())
})

gulp.task('privacy:russian', () => {
	return gulp
		.src(`${SOURCE}/privacy.njk`)
		.pipe(nunjucks.compile(require(`./${SOURCE}/content/privacy/ru.json`)))
		.pipe(gulp.dest(`${DESTINATION}/ru`))
		.pipe(browser.stream())
})

// IMAGES

gulp.task('images', () => {
	return gulp
		.src(`${SOURCE}/images/*.{png,webp}`)
		.pipe(gulp.dest(`${DESTINATION}/images`))
		.pipe(browser.stream())
})

// ICONS

gulp.task('icons', () => {
	return gulp.src(`${SOURCE}/icons/*.{png,jpg}`).pipe(gulp.dest(DESTINATION)).pipe(browser.stream())
})

// SCRIPTS

gulp.task('scripts', () => {
	return gulp
		.src(`${SOURCE}/scripts/*.js`)
		.pipe(gulp.dest(`${DESTINATION}/scripts`))
		.pipe(browser.stream())
})

const buildSeries = gulp.series([
	'styles',
	'home:english',
	'home:russian',
	'privacy:english',
	'privacy:russian',
	'images',
	'icons',
	'scripts',
])

// SERVE

gulp.task('serve', function () {
	browser.init({
		server: DESTINATION,
	})

	gulp.watch(`${SOURCE}/**/*`, buildSeries)
})

// BUILD

gulp.task('build', buildSeries)
