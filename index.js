/* global __dirname */
var fs = require('fs');
var path = require('path');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var ai = require('applicationinsights');

console.log("OCPIEF 0.0.2-beta7")
console.log("Create a Cordova Project in Existing folder \n\n")


var client = ai.getClient("52df4438-1324-41d1-80ce-658c182f18b5");

var projectFile = getFolderName() + '.jsproj';

addWin10Preference();

if (fs.existsSync(projectFile)){
    console.log("Project File found. " +projectFile);
    openProject(projectFile);
    client.trackEvent("project opened")
} else {
    console.log("Creating Default Cordova VS Project. " + projectFile)
    initAndOpenCordovaProject(projectFile);
    client.trackEvent("project created")    
}

function initAndOpenCordovaProject(projectFile){
    fs.writeFile('taco.json', '{"cordova-cli":"6.2.0"}', function(err){if(err) throw err;});       
    console.log("***" + __dirname);    
    fs.createReadStream(path.resolve(__dirname,'JSPROJTEMPLATE.jsproj'))
            .pipe(fs.createWriteStream(projectFile)
                .on('finish', function() {
                    openProject(projectFile);                                              
                })
            );
}

function addWin10Preference(){
    
    fs.readFile('config.xml', 'utf8', function(err, data){
        var doc = new DOMParser().parseFromString(data);
        var prefs = doc.getElementsByTagName("preference");               
        var found = false;
        for (var p in prefs){
            var nameAttribute = prefs[p].attributes;
            //if found node
            if (nameAttribute && nameAttribute[0] && nameAttribute[0].name==="name" && nameAttribute[0].value==='windows-target-version'){
                found = true;   
                console.log("found config.xml/preference")             
                //if found value
                if (nameAttribute && nameAttribute[1] && nameAttribute[1].name==="value" && nameAttribute[1].value==='10.0'){
                    console.log("already on windows 10")
                    return;
                } else {
                    console.log("upgrading to 10")
                    nameAttribute[1].value = '10.0'                                        
                } 
            } 
                                        
        }
        
        var widget = doc.getElementsByTagName("widget")[0];
        
        if (!found){
            console.log("node win prefs not found.. creating node")
            var newPref = doc.createElement("preference")            
            newPref.setAttribute('name','windows-target-version');            
            newPref.setAttribute('value','10.0');            
            widget.appendChild(newPref);            
        }
        
        var serializer = new XMLSerializer();
        var newConfigXml = serializer.serializeToString(doc)
        fs.writeFile('config.xml', newConfigXml, 'utf8', function(err, data){
            if (err) return console.log(err);
        });
                                   
    });     
}


function openProject(projFile){
    const exec = require('child_process').exec;
    exec(projFile, function(err, stdout, stderr) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
    });

}

function getFolderName(){
    var ap = path.resolve('.').split(path.sep);
    return ap[ap.length-1];    
}
