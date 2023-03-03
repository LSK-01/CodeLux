export {runAnalysis}
import { exec } from 'child_process';

async function processResults(projectID) {
    projectID = "testrepo";
    let fName = "./+"+projectID+"/megalinter-reports/mega-linter-report.json’";
    let errorCount = 0
    let linterCount = 0;

    const response = await fetch(fName);
    const results = await response.json();

    for (const linter of results.linters){   
        linterCount += 1;
        errorCount += linter.total_number_errors;
    }

    console.log(errorCount);
    let score = errorCount / linterCount;
    return score;
}

async function runAnalysis(projectID, type) {
    projectID = "testrepo";
    type = "documentation";
    var cmds = "cd ./src/routes/code_analysis/"+projectID+" & mega-linter-runner -f "+type+" -e 'JSON_REPORTER=true’ -e 'PRINT_ALPACA=false’ -e 'LOG_FILE=none'";
    exec(cmds,
        (error, stdout, stderr) => {
            // console.log(stdout);
            // console.log(stderr);
            if (error !== null) {
                console.log(`${error}`);
            }
        }
    );
};