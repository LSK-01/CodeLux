import { json } from "@sveltejs/kit";
import { app } from "../../hooks.server";
import type { RequestHandler } from "./$types";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { exec, execSync } from "child_process";
import fs from "fs";

function runAnalysis(projectID: string, projectType: string) {
  console.log("Starting analysis");
  const cmd =
    "cd ./src/routes/githubAPI/projectCode/" +
    projectID +
    " & copy ..\\..\\..\\codeanalysis\\.mega-linter.yml . & mega-linter-runner -f " +
    projectType.toLowerCase() +
    " --remove-container";
  try {
    // execSync(cmd, { stdio: "inherit" });
    execSync(cmd);
  } catch (err) {
    return false;
  }
  console.log("Completed analysis");
  return true;
}

async function processResults(projectID: string) {
  const path =
    "./src/routes/githubAPI/projectCode/" +
    projectID +
    "/megalinter-reports/mega-linter-report.json";
  var res;
  try {
    res = JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (err) {
    return {
      success: false,
      analysisScore: 0,
    };
  }
  const results = res;
  var errorCount = 0;
  var linterCount = 0;
  for (const linter of results.linters) {
    linterCount += 1;
    errorCount += 1 + linter.total_number_errors;
  }
  const analysisScore = linterCount / errorCount;
  console.log("Processed results");
  console.log("Analysis score: " + analysisScore);
  return {
    success: true,
    analysisScore: Math.round(analysisScore * 100) / 100,
  };
}

async function updateScore(projectID: string, analysisScore: number) {
  try {
    const db = getFirestore(app);
    const project = doc(db, "projects", projectID);
    await updateDoc(project, {
      codeAnalysisScore: analysisScore,
      codeAnalysisDate: new Date(),
    });
  } catch (err) {
    return {
      success: false,
    };
  }
  console.log("Updated analysis score");
  return { success: true };
}

async function deleteProjectFiles(projectID: string) {
  const cmd = "rd /S /Q .\\src\\routes\\githubAPI\\projectCode\\" + projectID;
  exec(cmd, (error, stdout, stderr) => {
    if (error !== null) {
      console.log(error);
    }
  });
  console.log("Deleted project files");
}

export const POST = (async ({ request }) => {
  const data = await request.json();
    const analysed = await runAnalysis(data.projectID, data.projectType);
    if (analysed) {
        const processed = await processResults(data.projectID);
        if (processed.success) {
            const updated = await updateScore(data.projectID, processed.analysisScore);
            deleteProjectFiles(data.projectID);
            return json({  success: updated });
        } else {
            return json({  success: false })
        }
    } else {
        return json({success: false})
    } 
/*   const db = getFirestore(app);
  const docref = doc(db, "projects", data.projectID);

  await updateDoc(docref, {
    codeAnalysisScore: 0.83,
  });

  return json({ success: true });  */
}) satisfies RequestHandler;
