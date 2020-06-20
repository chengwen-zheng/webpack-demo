const assert = require('assert');

describe('webpack.base.js test case ',()=>{
    const baseConfig = require('../../lib/webapck.base');
    
    it('entry',() => {
        assert.equal(baseConfig.entry.index.indexOf('smoke/template/src/index/index.js')>-1, true);
        assert.equal(baseConfig.entry.search.indexOf('smoke/template/src/search/index.js')> -1, true);
    })
})