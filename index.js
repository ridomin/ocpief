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
            .pipe(fs.createWriteStream(projectFile));
}

function getFolderName(){
    var ap = path.resolve('.').split(path.sep);
    return ap[ap.length-1];    
}
