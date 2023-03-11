import { app } from "../../hooks.server";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import type { PageServerLoad } from "../login/$types";
import type { user } from "../../user";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ cookies, request, url }) => {
    //@ts-ignore
    const data = await request.arrayBuffer();
    const csv = Buffer.from(new Uint8Array(data)).toString();
    const splitted = csv.split(/\r?\n/);
    splitted.splice(0, 4);
    splitted.splice(splitted.length - 2, 2);
    console.log("splited: ", splitted);
    splitted.forEach((element) => {
      console.log("cunt, ", element.split(","));
    });

    //create 2d array
    const metrics = {};
    //first element in splitted is the metric keys
    const keys = splitted[0].split(",")
    console.log("keys, ", keys)
    keys.forEach(key => {
       
        metrics[key] = [];
        
    });

    for (let i = 1; i < splitted.length; i++) {
      const values = splitted[i].split(",");
      for (let j = 0; j < values.length; j++) {
        const field = Object.keys(metrics)[j];
        metrics[field].push(Number(values[j]));
      }
    }

    console.log("metrics obj: ", JSON.stringify({
        metrics: metrics,
      }))

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
      const poo = await response.json();
      console.log("retrain resp: ", poo);
  },
};

export const load: PageServerLoad = async ({ cookies, url }) => {
  const cookie = cookies.get("user");
  if (cookie == undefined) {
    throw redirect(302, "/login");
  }
  const user: user = JSON.parse(cookie);

  const db = getFirestore(app);

  const projectID = url.searchParams.get("id")!;
  const project = doc(db, "projects", projectID);
  const projectDoc = await getDoc(project);

  const name = projectDoc.get("projectname");
  const desc = projectDoc.get("projectdescription");
  const deadline = projectDoc.get("deadline").toDate();
  const startDate = projectDoc.get("startdate").toDate().toLocaleDateString();
  const smetrics = projectDoc.get("smetrics");
  const budget = Math.round(projectDoc.get("budget") * 100) / 100;
  const codeAnalysisScore = projectDoc.get("codeAnalysisScore") * 100;
  const codeAnalysisDate = projectDoc
    .get("codeAnalysisDate")
    .toDate()
    .toLocaleString();
  const managerUsername = projectDoc.get("managerusername");
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
  if (smetrics) {
    noRisk = false;
    for (let key in smetrics) {
      if (key.endsWith("answered")) {
        const metricName = key.substring(0, key.lastIndexOf("_"));
        //@ts-ignore
        aiMetrics[metricName] = smetrics[metricName] / smetrics[key];
      }
    }
    //add code analysis and budget and num comits, non soft metrics
    //@ts-ignore
    aiMetrics["code_analysis"] = codeAnalysisScore;
    //@ts-ignore

    aiMetrics["budget"] = budget;
    //@ts-ignore

    aiMetrics["num_commits"] = projectDoc.get("numCommits");

    //query AI backend for stuff
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
    console.log(
      "classification (prob of risk): ",
      res.classification[0],
      "features: ",
      res.features,
      "predictedclass: ",
      res.predicted_class
    );
  }

  const githubLink = projectDoc.get("githublink");
  const projectType = projectDoc.get("projecttype");
  const devUsernames: string[] = [];
  for (const developer of projectDoc.get("developerusernames")) {
    devUsernames.push(developer);
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
