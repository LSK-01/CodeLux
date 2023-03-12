import { json, type RequestHandler } from "@sveltejs/kit";
import { app } from "../../../hooks.server";
import {
    getFirestore,
    doc,
    updateDoc
} from "firebase/firestore";

// Function to check if code analysis successful or not
export const POST = (async ({ request }) => {
    // Get data
    const data = await request.json();

    // Get firestore instance
    const db = getFirestore(app);

    // Get project
    const project = doc(db, "projects", data.projectID);

    var success = true;
    
    if (data.outcome == 'Success') {
        success = false;
    }

    // Update project with new value
    updateDoc(project, {"success": success}) 

    return json({ success: true });
}) satisfies RequestHandler;