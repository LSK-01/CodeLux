import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../../hooks.server";

export const POST = (async ({ request }) => {
  const answers = await request.json();
  console.log("answetrse", answers);
  const db = getFirestore(app);

  //@ts-ignore
  const obj = Object.fromEntries(answers.map(([v, k]) => [v, k]));

  //format object
  obj.budget = Number(obj.budget);
  obj.customercontactfrequency = Number(obj.customercontactfrequency);
  obj.deadline = new Date(obj.deadline);
  obj.startdate = new Date(obj.startdate);
  obj.developerusernames = obj.developerusernames.split(",");
  obj.complete = false;
  obj.atRisk = false;
  obj.numCommits = 0;
  obj.codeAnalysisScore = 0;
  obj.codeAnalysisDate = new Date();
  await addDoc(collection(db, "projects"), obj);

  return json({ success: true });
}) satisfies RequestHandler;
