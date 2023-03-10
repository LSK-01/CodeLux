import { json, type RequestHandler } from "@sveltejs/kit";
import { app } from "../../../hooks.server";
import { getFirestore, doc, updateDoc, Timestamp } from "firebase/firestore";

export const POST = (async ({ request }) => {
  const data = await request.json();
  const db = getFirestore(app);
  const project = doc(db, "projects", data.projectID);
  var complete = true;
  if (data.progress == "Complete") {
    complete = false;
  } else {
    //if they are completing the project also write whetehr success/failure to the db (done), and the end date(done)
    //also send stuff for retraining here
    // const response = await fetch(
    //   "https://cs261-backend-7r5ljue3ha-no.a.run.app/retrain",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       metrics: { ...data.metrics, success: data.success },
    //     }),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }
    // );
    // const poo = await response.json();
    // console.log("retrain resp: ", poo);
  }
  updateDoc(project, {
    complete: complete,
    enddate: Timestamp.now(),
    success: data.success,
  });
  return json({ success: true });
}) satisfies RequestHandler;
