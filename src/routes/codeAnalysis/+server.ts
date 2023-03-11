import { json, type RequestHandler } from "@sveltejs/kit";
import { exec, execSync } from 'child_process';
import fs from 'fs';

function runAnalysis(projectID:string, projectType:string) {
    console.log("Starting analysis");
    const cmd = "cd ./src/routes/githubAPI/projectCode/"+projectID+" & copy ..\\..\\..\\codeanalysis\\.mega-linter.yml . & mega-linter-runner -f "+projectType.toLowerCase()+" --remove-container";
    try {
        // execSync(cmd, {stdio: 'inherit'});
        execSync(cmd);
    } catch (err){
        return false;
    };
    console.log("Completed analysis");
    return true;
}

async function processResults(projectID:string) {
    const fName = "./src/routes/githubAPI/projectCode/"+projectID+"/megalinter-reports/mega-linter-report.json";
    var res;
    try {
        res = JSON.parse(fs.readFileSync(fName, 'utf8'));
    } catch (err){
        return {
            success: false,
            analysisScore: 0
        }
    };
    const results = res;
    var errorCount = 0
    var linterCount = 0;
    for (const linter of results.linters){   
        linterCount += 1;
        errorCount += 1 + linter.total_number_errors;
    }
    const analysisScore = linterCount / errorCount;
    console.log("Processed results");
    console.log("Analysis score: "+analysisScore);
    return {
        success: true,
        analysisScore: (Math.round(analysisScore * 100) / 100)
    }
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
    const res1 = await runAnalysis(data.projectID, data.projectType)
    const res2 = await processResults(data.projectID);
    deleteProjectFiles(data.projectID);
    return json({  success: res1&&res2, analysisScore: res2.analysisScore });
}) satisfies RequestHandler;
