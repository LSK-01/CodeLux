import { app } from "../../hooks.server";
import {
    getFirestore,
    collection,
    doc,
    getDoc,
} from "firebase/firestore";
import type { PageServerLoad } from "../login/$types";
import type { user } from "../../user";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({cookies, url}) => {
    const cookie = cookies.get('user');
    if (cookie == undefined) {
        throw redirect(302, '/login');
    }
    const user: user = JSON.parse(cookie);
    const db = getFirestore(app);
    
    const projectID = url.searchParams.get("id")!;
    const project = doc(db, "projects", projectID);
    const projectDoc = await getDoc(project);

    const name = projectDoc.get("projectname");
    const desc = projectDoc.get("projectdescription");
    const deadline = projectDoc.get("deadline").toDate();
    const startDate = projectDoc.get("startdate").toDate().toLocaleDateString();
    const budget = Math.round(projectDoc.get("budget") * 100) / 100;
    const codeAnalysisScore = projectDoc.get("codeAnalysisScore") * 100;
    const codeAnalysisDate = projectDoc
        .get("codeAnalysisDate")
        .toDate()
        .toLocaleString();
    const managerUsername = projectDoc.get("managerusername");
    const custContactFrequency = projectDoc.get("customercontactfrequency");
    const githubLink = projectDoc.get("githublink");
    const projectType = projectDoc.get("projecttype");
    const devUsernames: string[] = [];
    for (const developer of projectDoc.get("developerusernames")) {
        devUsernames.push(developer);
    }

    var progress = "Not complete";
    if (projectDoc.get("complete")) {
        progress = "Complete";
    }

    var status = "Not at risk";
    if (projectDoc.get("atRisk")) {
        status = "At risk";
    }

    var outcome = "Success";
    if (!projectDoc.get("success")) {
        outcome = "Failure";
    }

    return {
        user: user,
        project: {
            name: name,
            desc: desc,
            deadline: deadline,
            startDate: startDate,
            budget: budget,
            codeAnalysisScore: codeAnalysisScore,
            codeAnalysisDate: codeAnalysisDate,
            managerUsername: managerUsername,
            custContactFrequency: custContactFrequency,
            githubLink: githubLink,
            devUsernames: devUsernames,
            progress: progress,
            status: status,
            outcome: outcome,
            projectType: projectType,
            id: projectID
        }
    };
};
