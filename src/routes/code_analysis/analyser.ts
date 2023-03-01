export {}

async function processResults(fName:string){
    let errorCount: number = 0
    let linterCount: number = 0;

    const response = await fetch(fName);
    const results = await response.json();

    for (const linter of results.linters){   
        linterCount += 1;
        errorCount += linter.total_number_errors;
    }

    console.log(errorCount);
    let score: number = errorCount / linterCount;
    return score;
}

async function runAnalyser() {
    var exec = require('child_process').exec;

    exec('mega-linter-runner -f documentation -e \'JSON_REPORTER=true\’ -e \'PRINT_ALPACA=false\’',
        function (error:string, stdout:string, stderr:string) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    )
}

let fName: string = "./megalinter-reports/mega-linter-report.json’ ";