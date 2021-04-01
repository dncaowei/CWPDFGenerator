const fs = require('fs')

function deleteFiles(path){
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFiles(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
    }
}

module.exports = {
    deleteFiles
};