const glob = require('glob-all');

describe('Checking generated css js files',() =>{
    it('should generate css js files',(done)=>{
        const files = glob.sync([
            './dist/search_*.css',
            './dist/index_*.css',
            './dist/search_*.js',
            './dist/index_*.js'
        ]);

        if(files.length > 0){
            done()
        }else{
            throw new Error('no css js files generated');
        }
    })
})