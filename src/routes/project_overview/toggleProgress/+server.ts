import { json, type RequestHandler } from "@sveltejs/kit";
import { app } from "../../../hooks.server";
import {
    getFirestore,
    doc,
    updateDoc,
    Timestamp
} from "firebase/firestore";

export const POST = (async ({ request }) => {
    const data = await request.json();
    const db = getFirestore(app);
    const project = doc(db, "projects", data.projectID);
    var complete = true;
    if (data.progress == 'Complete') {
        complete = false;
    }
    else{
        //if they are completing the project also write whetehr success/failure to the db, and the end date
    }
    updateDoc(project, {"complete": complete, "enddate": Timestamp.now()}) 
    return json({ success: true });
}) satisfies RequestHandler;