import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { exec, execSync } from 'child_process';

async function processResults(projectID:string) {
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
    console.log("Processed results");
    return 0.81;
}

export const POST = ( async ({ request }) => {
    const data = await request.json();
    const projectType = "documentation";
    console.log("Starting analysis");
    const cmd1 = "cd ./src/routes/githubAPI/projectCode/"+data.projectID+" & mega-linter-runner -f "+projectType+" -e 'JSON_REPORTER=true’  -e 'LOG_FILE=none' -e 'DISABLE_ERRORS=true' --remove-container";
    // execSync(cmd1, {stdio: 'inherit'});
    execSync(cmd1);
    console.log("Completed analysis");
    const analysisScore = await processResults(data.projectID);
    const cmd2 = "rd /S /Q .\\src\\routes\\githubAPI\\projectCode\\"+data.projectID;
    exec(cmd2, (error, stdout, stderr) => {
        // console.log('stdout: ' +stdout);
        // console.log('stderr: ' +stderr);
        if (error !== null) {
             console.log(error);
        }
    });
    console.log("Deleted project files");
    return json({  success: true, analysisScore: analysisScore });
}) satisfies RequestHandler;
