import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { collection, addDoc, getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../../hooks.server";

export const POST = (async ({ request }) => {
  const answers = await request.json();
  console.log("answetrse", answers);
  const db = getFirestore(app);

  //@ts-ignore
  const obj = Object.fromEntries(answers.map(([v, k]) => [v, k]));

  //format object
  obj.budget = Number(obj.budget);
  obj.deadline = new Date(obj.deadline);
  obj.startdate = new Date(obj.startdate);
  obj.developerusernames = obj.developerusernames.split(",");
  obj.complete = false;
  obj.success = true;
  obj.atRisk = false;
  obj.numCommits = 0;
  obj.codeAnalysisScore = 0;
  obj.codeAnalysisDate = new Date();
  const projectDoc = await addDoc(collection(db, "projects"), obj);
  await setDoc(doc(db, "projects", "metrics:" + projectDoc.id), {})
  return json({ success: true, projectID:  projectDoc.id});
}) satisfies RequestHandler;
