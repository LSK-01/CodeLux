import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../../hooks.server";
import type { project } from "../add/project";

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
  const docRef = await addDoc(collection(db, "projects"), obj);

  return json({ success: true });
}) satisfies RequestHandler;
