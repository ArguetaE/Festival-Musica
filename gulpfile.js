import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

//Crear funciones 
const sass = gulpSass(dartSass)

//para compilar js con glup
export function js(done) {

    src('src/js/app.js')
        .pipe(dest ('build/js'))

    done()
}

//para compilar sass con glup
export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true})
    .pipe(sass().on('error', sass.logError)) //.on nos sirve para ver errores en la terminal
    .pipe(dest('build/css', {sourcemaps:true}))

    done();
}

//unir watch von sass y glup
export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

//ejecuta en orden (js, css, dev)
export default series(js, css, dev)