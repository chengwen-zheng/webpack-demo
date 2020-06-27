const Compiler = require('./Compiler');

const options = require('../simplepack.config');

new Compiler(options).run();