if(process.env.NODE_ENV === 'produciton'){
    module.exports = require('./dist/large-number.min.js')
}else {
    module.exports = require('./dist/large-number.js')
}