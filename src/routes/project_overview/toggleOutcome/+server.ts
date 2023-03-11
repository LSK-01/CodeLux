import { json, type RequestHandler } from "@sveltejs/kit";
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
    var success = true;
    if (data.outcome == 'Success') {
        success = false;
    }
    updateDoc(project, {"success": success}) 
    return json({ success: true });
}) satisfies RequestHandler;