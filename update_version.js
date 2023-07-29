const browserify = require('browserify')
const fs = require('fs')
const tinyify = require('tinyify')

// 如果不存在，创建 ./dist
if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
}

browserify(['./src/index.js'])
    .transform('babelify', {
        presets: ['@babel/preset-env'],
        global: true
    })
    .plugin(tinyify, {
        env: {
            appid: 'enconvo.screenshot-ocr'
        }
    })
    .bundle()
    .pipe(fs.createWriteStream('./dist/main.js'))

// copy main.yml to dist/main.yml
fs.copyFileSync('./main.yml', './dist/main.yml')
