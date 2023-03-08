import { json, type RequestHandler } from "@sveltejs/kit";
import { exec, execSync } from 'child_process';
import fs from 'fs';

function runAnalysis(projectID:string, projectType:string) {
    console.log("Starting analysis");
    const cmd = "cd ./src/routes/githubAPI/projectCode/"+projectID+" & copy ..\\..\\..\\codeanalysis\\.mega-linter.yml . & mega-linter-runner -f "+projectType.toLowerCase()+" --remove-container";
    // execSync(cmd1, {stdio: 'inherit'});
    execSync(cmd);
    console.log("Completed analysis");
}

async function processResults(projectID:string) {
    const fName = "./src/routes/githubAPI/projectCode/"+projectID+"/megalinter-reports/mega-linter-report.json";
    const results = JSON.parse(fs.readFileSync(fName, 'utf8'));
    var errorCount = 0
    var linterCount = 0;
    for (const linter of results.linters){   
        linterCount += 1;
        errorCount += 1 + linter.total_number_errors;
    }
    const analysisScore = linterCount / errorCount;
    console.log("Processed results");
    console.log("Analysis score: "+analysisScore);
    return (Math.round(analysisScore * 100) / 100);
}

async function deleteProjectFiles(projectID:string) {
    const cmd = "rd /S /Q .\\src\\routes\\githubAPI\\projectCode\\"+projectID;
    exec(cmd, (error, stdout, stderr) => {
        if (error !== null) {
             console.log(error);
        }
    });
    console.log("Deleted project files");
}

export const POST = ( async ({ request }) => {
    const data = await request.json();
    runAnalysis(data.projectID, data.projectType)
    const analysisScore = await processResults(data.projectID);
    deleteProjectFiles(data.projectID);
    return json({  success: true, analysisScore: analysisScore });
}) satisfies RequestHandler;
