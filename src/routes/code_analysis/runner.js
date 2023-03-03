var exec = require('child_process').exec;
var cmds = "cd ./testrepo & mega-linter-runner -f documentation -e 'JSON_REPORTER=true’ -e 'PRINT_ALPACA=false’ -e 'LOG_FILE=none'";

exec(cmds,
    (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
});