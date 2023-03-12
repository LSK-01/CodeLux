import { app } from "../../hooks.server";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import type { PageServerLoad } from "../login/$types";
import type { user } from "../../user";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ cookies, request, url }) => {
    //@ts-ignore
    // Get the CSV data from the request body and convert to a string
    const data = await request.arrayBuffer();
    const csv = Buffer.from(new Uint8Array(data)).toString();

    // Split the CSV by new line and remove the first 4 and last 2 lines
    const splitted = csv.split(/\r?\n/);
    splitted.splice(0, 4);
    splitted.splice(splitted.length - 2, 2);

    // Create 2d array
    const metrics: any = {};
    // First element in splitted is the metric keys
    const keys = splitted[0].split(",");
    // For each key, create an empty array in the metrics object
    keys.forEach((key) => {
      metrics[key] = [];
    });

    // Loop through the remaining lines and add each value to the corresponding metric array
    for (let i = 1; i < splitted.length; i++) {
      const values = splitted[i].split(",");
      for (let j = 0; j < values.length; j++) {
        const field = Object.keys(metrics)[j];
        metrics[field].push(Number(values[j]));
      }
    }

    // Send a POST request to API to retrain the model with the new metrics data
    const response = await fetch(
      "https://cs261-backend-7r5ljue3ha-no.a.run.app/retrain",
      {
        method: "POST",
        body: JSON.stringify({
          metrics: metrics,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
  },
};

export const load: PageServerLoad = async ({ cookies, url }) => {
  // Get cookie
  const cookie = cookies.get("user");

  // Redirect user to login if cookie undefined
  if (cookie == undefined) {
    throw redirect(302, "/login");
  }

  // Get user
  const user: user = JSON.parse(cookie);

  // Get firestore instance
  const db = getFirestore(app);

  // Get project params
  const projectID = url.searchParams.get("id")!;
  const project = doc(db, "projects", projectID);
  const projectDoc = await getDoc(project);

  // Get project data
  const name = projectDoc.get("projectname");
  const desc = projectDoc.get("projectdescription");
  const deadline = projectDoc.get("deadline").toDate();
  const startDate = projectDoc.get("startdate").toDate().toLocaleDateString();

  // Get project metrics
  const metricsDocRef = doc(db, "projects", "metrics:" + projectID);
  const metricsDoc = await getDoc(metricsDocRef);
  const smetrics = metricsDoc.data();

  const budget = Math.round(projectDoc.get("budget") * 100) / 100;
  const codeAnalysisScore = projectDoc.get("codeAnalysisScore") * 100;
  const codeAnalysisDate = projectDoc
    .get("codeAnalysisDate")
    .toDate()
    .toLocaleString();
  const managerUsername = projectDoc.get("managerusername");
  const githubLink = projectDoc.get("githublink");
  const projectType = projectDoc.get("projecttype");
  const devUsernames: string[] = [];
  for (const developer of projectDoc.get("developerusernames")) {
    devUsernames.push(developer);
  }
  var progress = "Not complete";
  if (projectDoc.get("complete")) {
    progress = "Complete";
  }

  var status = "Not at risk";
  if (projectDoc.get("atRisk")) {
    status = "At risk";
  }

  var outcome = "Success";
  if (!projectDoc.get("success")) {
    outcome = "Failure";
  }

  const aiMetrics = {};
  let res = {
    features: {},
    classification: [0, 0],
    predicted_class: 0,
  };

  let noRisk = true;
  if (smetrics!.training != undefined) {
    noRisk = false;
    for (let key in smetrics) {
      if (key.endsWith("answered")) {
        const metricName = key.substring(0, key.lastIndexOf("_"));
        //@ts-ignore
        aiMetrics[metricName] = smetrics[metricName] / smetrics[key];
      }
    }
    // Add code analysis and budget and num commits, non soft metrics
    //@ts-ignore
    aiMetrics["code_analysis"] = codeAnalysisScore;
    //@ts-ignore
    aiMetrics["budget"] = budget;
    //@ts-ignore
    aiMetrics["num_commits"] = projectDoc.get("numCommits");
    //@ts-ignore
    aiMetrics["commit_sentiment"] = projectDoc.get("sentiAnal");
    // Query AI backend
    const response = await fetch(
      "https://cs261-backend-7r5ljue3ha-no.a.run.app/classify",
      {
        method: "POST",
        body: JSON.stringify({ metrics: aiMetrics }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    res = await response.json();
  }

  return {
    user: user,
    project: {
      name: name,
      desc: desc,
      deadline: deadline,
      startDate: startDate,
      budget: budget,
      codeAnalysisScore: codeAnalysisScore,
      codeAnalysisDate: codeAnalysisDate,
      managerUsername: managerUsername,
      githubLink: githubLink,
      devUsernames: devUsernames,
      progress: progress,
      status: status,
      outcome: outcome,
      projectType: projectType,
      id: projectID,
    },
    features: res.features,
    failureProbability: res.classification[0],
    predClass: res.predicted_class,
    noRisk: noRisk,
    //for retraining
    metrics: aiMetrics,
  };
};
