import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { collection, addDoc, getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../../hooks.server";

// Defining a POST request handler
export const POST = (async ({ request }) => {
  // Get the JSON data from the request
  const answers = await request.json();
  // Getting the Firestore instance
  const db = getFirestore(app);

  //@ts-ignore
  // Converting the array of tuples to an object
  const obj = Object.fromEntries(answers.map(([v, k]) => [v, k]));

  // Format object
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
  obj.sentiAnal = 0
  const projectDoc = await addDoc(collection(db, "projects"), obj);

  // Adding the document to the 'projects' collection in Firestore
  await setDoc(doc(db, "projects", "metrics:" + projectDoc.id), {})

  // Returning the response in JSON format
  return json({ success: true, projectID:  projectDoc.id});
}) satisfies RequestHandler;
