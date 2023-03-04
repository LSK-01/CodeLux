import { app } from "../../hooks.server";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import type { PageServerLoad } from "../login/$types";
import type { Actions } from './$types';
import { runAnalysis } from '../code_analysis/+server'
import { handleGetGit } from "../githubAPI/handler";
import type { user } from "../../user";

export const load: PageServerLoad = async ({cookies, url}) => {
    const cookie = cookies.get("user")!;
    const user: user = JSON.parse(cookie);
    const db = getFirestore(app);
    
    const projectID = url.searchParams.get("id")!;
    const project = doc(db, "projects", projectID);
    const projectDoc = await getDoc(project);

    const name = projectDoc.get("projectname");
    const desc = projectDoc.get("projectdescription");
    const deadline = projectDoc.get("deadline").toDate().toLocaleString();
    const startDate = projectDoc.get("startdate").toDate().toLocaleString();
    const budget = Math.round(projectDoc.get("budget") * 100) / 100;
    const codeAnalysisScore = projectDoc.get("codeAnalysisScore") * 100;
    const codeAnalysisDate = projectDoc
        .get("codeAnalysisDate")
        .toDate()
        .toLocaleString();
    const managerUsername = projectDoc.get("managerusername");
    const githubLink = projectDoc.get("githublink");
    const projectType = projectDoc.get("projecttype");
    const devUsernames: string[] = [];
    for (const developer of projectDoc.get("developerusernames")) {
        devUsernames.push(developer);
    }
    var complete = "Not complete";
    var status = "Not at risk";
    if (projectDoc.get("complete")) {
        complete = "Complete";
        if (projectDoc.get("atRisk")) {
            status = "Success";
        } else {
            status = "Failed";
        }
    } else if (projectDoc.get("atRisk")) {
        status = "At risk";
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
            githubLink: githubLink,
            devUsernames: devUsernames,
            status: status,
            projectType: projectType,
            id: projectID
        }
    };
};

export const actions = {
    default: async ({request}) => {
        // const data = Object.fromEntries((await request.formData()).get("data"));
        const data = Object.fromEntries((await (request.formData())).entries());
        console.log(data);
        const projectID = data.project.id;
        const projectType = data.project.projectType;
        const githubLink = data.project.githubLink;
        const githubToken = data.user.githubToken;
        await handleGetGit(projectID, githubLink, githubToken);
        const analysisScore = await runAnalysis(projectID, projectType);
        const db = getFirestore(app);
        const project = doc(db, "projects", projectID);
        await updateDoc(project, {"codeAnalysisScore": analysisScore, "codeAnalysisDate": new Date()}) 
    }
} satisfies Actions;
