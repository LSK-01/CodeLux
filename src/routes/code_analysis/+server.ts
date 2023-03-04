import {exec} from 'child_process';

async function processResults(projectID:string) {
    projectID = "testrepo";
    const fName = "./projectCode/+"+projectID+"/megalinter-reports/mega-linter-report.json’";
    var errorCount = 0
    var linterCount = 0;

    // const response = await fetch(fName);
    // const results = await response.json();

    // for (const linter of results.linters){   
    //     linterCount += 1;
    //     errorCount += linter.total_number_errors;
    // }

    // console.log(errorCount);
    // let score = errorCount / linterCount;
    return 0.43;
}

export async function runAnalysis(projectID:string, projectType:string) {
    projectID = "testrepo";
    projectType = "documentation";
    const cmds:string = "cd ./src/routes/githubapi/projectCode/"+projectID+" & mega-linter-runner -f "+projectType+" -e 'JSON_REPORTER=true’ -e 'PRINT_ALPACA=false’ -e 'LOG_FILE=none' -e 'DISABLE_ERRORS=true'";
    exec(cmds,
        (error, stdout, stderr) => {
            // console.log(stdout);
            // console.log(stderr);
            if (error !== null) {
                console.log(`${error}`);
            }
        }
    );
    return processResults(projectID);
};