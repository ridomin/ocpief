/* global __dirname */
var fs = require('fs');
var path = require('path');

var projectFile = getFolderName() + '.jsproj';

if (fs.existsSync(projectFile)){
    console.log("Project File found. " +projectFile);
} else {
    console.log("Creating Default Cordova VS Project." + projectFile)
    fs.createReadStream(
        path.resolve(__dirname,'JSPROJTEMPLATE.jsproj'))
            .pipe(fs.createWriteStream(projectFile)
                .on('finish', ()=> {
                    const exec = require('child_process').exec;
                    exec(projectFile, function(err, stdout, stderr) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(stdout);
                    });                    
                })
            );
}

function getFolderName(){
    var ap = path.resolve('.').split(path.sep);
    return ap[ap.length-1];    
}
