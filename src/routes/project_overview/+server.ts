import { json } from "@sveltejs/kit";
import { app } from "../../hooks.server";
import type { RequestHandler } from "./$types";
import {
    getFirestore,
    doc,
    updateDoc
} from "firebase/firestore";

export const POST = (async ({ request }) => {
    const data = await request.json();
    const db = getFirestore(app);
    const project = doc(db, "projects", data.projectID);
    updateDoc(project, {"codeAnalysisScore": data.analysisScore, "codeAnalysisDate": new Date()}) 
    console.log("Updated analysis score");
    return json({ success: true });
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
    const data = await request.json();
    const db = getFirestore(app);
    const project = doc(db, "projects", data.projectID);
    var complete = true
    if (data.progress == "Complete"){
        complete = false;
    }
    updateDoc(project, {"complete": complete});
    return json({ success: true });
}) satisfies RequestHandler;