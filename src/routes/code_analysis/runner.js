var exec = require('child_process').exec;
var yourscript = exec('sh analyser.sh',
    (error:string, stdout:string, stderr:string) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
});