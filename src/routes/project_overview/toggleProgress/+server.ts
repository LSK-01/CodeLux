import { json, RequestHandler } from "@sveltejs/kit";
import { app } from "../../../hooks.server";
import {
    getFirestore,
    doc,
    updateDoc
} from "firebase/firestore";

export const POST = (async ({ request }) => {
    const data = await request.json();
    const db = getFirestore(app);
    const project = doc(db, "projects", data.projectID);
    var complete = true;
    if (data.progress == 'Complete') {
        complete = false;
    }
    updateDoc(project, {"complete": complete}) 
    return json({ success: true });
}) satisfies RequestHandler;