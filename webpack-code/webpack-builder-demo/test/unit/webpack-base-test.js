const assert = require('assert');

describe('webpack.base.js test case ',()=>{
    const baseConfig = require('../../lib/webapck.base');
    
    it('entry',() => {
        assert.equal(baseConfig.entry.index, 'F:/workspace/961771834/webpack-demo/webpack-code/webpack-builder-demo/test/smoke/template/src/index/index.js');
        assert.equal(baseConfig.entry.search, 'F:/workspace/961771834/webpack-demo/webpack-code/webpack-builder-demo/test/smoke/template/src/search/index.js');
    })
})