const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

module.exports = function (source) {
    const images = source.match(/(\.\/images\/(.*)\.JPG)\?__sprite/g);

    let imageSrc = images.map((imageSrc) => path.join(__dirname, imageSrc.replace('?__sprite', '')))

    let callback = this.async();

    Spritesmith.run({
        src: imageSrc
    }, function handleResult(err, result) {
        
        fs.mkdir(path.join(process.cwd()+'/dist'),(error,result) => error ? console.log(error):console.log(result));

        fs.writeFileSync(path.join(process.cwd()+'/dist/sprite.jpg'), result.image );

        fs.writeFileSync(path.join(process.cwd() + '/dist/indx.css'), source.replace(/(\.\/images\/(.*)\.JPG)\?__sprite/g, './dist/sprit.jpg'), (err, data) => {
            if (err) {
                return callback(err, '');
            }
            return callback(null, data);
            
        })
    });
}