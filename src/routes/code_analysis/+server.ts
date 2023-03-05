import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { exec, execSync } from 'child_process';
import fs from 'fs';

async function processResults(projectID:string) {
    const fName = "./src/routes/githubAPI/projectCode/"+projectID+"/megalinter-reports/mega-linter-report.json";
    const results = JSON.parse(fs.readFileSync(fName, 'utf8'));
    var errorCount = 0
    var linterCount = 0;
    for (const linter of results.linters){   
        linterCount += 1;
        errorCount += linter.total_number_errors;
    }
    console.log(errorCount);
    const analysisScore = errorCount / linterCount;
    console.log("Processed results");
    return (Math.round(analysisScore * 100) / 100);
}

export const POST = ( async ({ request }) => {
    const data = await request.json();
    const projectType = "documentation";
    console.log("Starting analysis");
    // const cmd1 = "cd ./src/routes/githubAPI/projectCode/"+data.projectID+" & mega-linter-runner -f "+projectType+" -e 'JSON_REPORTER: true’  -e 'LOG_FILE=none' -e 'DISABLE_ERRORS=true' --remove-container";
    const cmd1 = "cd ./src/routes/githubAPI/projectCode/"+data.projectID+" & copy ..\\..\\..\\code_analysis\\.mega-linter.yml . & mega-linter-runner -f "+projectType+" --remove-container";
    // execSync(cmd1, {stdio: 'inherit'});
    // execSync(cmd1);
    console.log("Completed analysis");
    const analysisScore = await processResults(data.projectID);
    const cmd2 = "rd /S /Q .\\src\\routes\\githubAPI\\projectCode\\"+data.projectID;
    // exec(cmd2, (error, stdout, stderr) => {
    //     // console.log('stdout: ' +stdout);
    //     // console.log('stderr: ' +stderr);
    //     if (error !== null) {
    //          console.log(error);
    //     }
    // });
    console.log("Deleted project files");
    return json({  success: true, analysisScore: analysisScore });
}) satisfies RequestHandler;
