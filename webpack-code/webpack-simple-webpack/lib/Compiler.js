const {
    getAST,
    getDependencies,
    transform
} = require("./parser");
const path = require('path');
const fs = require('fs');


module.exports = class Compiler {
    constructor(options) {
        const {
            entry,
            output
        } = options;
        this.modules = [];
        this.entry = entry;
        this.output = output;
    }

    run() {
        const entryModule = this.buildModule(this.entry, true);
        this.modules.push(entryModule);

        this.modules.forEach((_module) => {
            _module.dependencies.forEach((dependency) => {
                this.modules.push(this.buildModule(dependency));
            })
        })
        this.emitFiles();
    }

    buildModule(filename, isEntry) {
        let ast;
        if (isEntry) {
            ast = getAST(filename);
        } else {
            const absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAST(absolutePath);
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            transformCode: transform(ast)
        }
    }

    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename);
        let modules = '';
        this.modules.forEach((_module) => {
            modules += `'${_module.filename}': function (require, module, exports){ ${_module.transformCode} } ,`
        });

        const bundle = `
            (function (modules) {
                function require(filename){
                    const fn = modules[filename];
                    const module = { export: {} };

                    fn(require, module, module.export);
                    
                    return module.exports;
                }

                require('${this.entry}');
            })({${modules}})
        `;

        console.log(modules)
        fs.writeFileSync(outputPath, bundle, 'utf-8');
    }
}