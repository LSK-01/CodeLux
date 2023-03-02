import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import type { PageServerLoad } from "../login/$types";

export const load: PageServerLoad = async ({params}) => {
    let codeAnalysisScore = 0;
    let codeAnalysisDate = "";
    let outcome = "";
    let completion = "";
    let status = "Not at risk";
    const db = getFirestore(app);
    const project = doc(db, "projects", "jbyYPtjz82qsybRuVYlb");
    const projectDoc = await getDoc(project);
    let name = projectDoc.get("projectname");
    let desc = projectDoc.get("projectdescription");
    let deadline = projectDoc.get("deadline").toDate().toLocaleString();
    let startDate = projectDoc.get("startdate").toDate().toLocaleString();
    let budget = Math.round(projectDoc.get("budget") * 100) / 100;
    // codeAnalysisScore = projectDoc.get("codeAnalysisScore")*100;
    // codeAnalysisDate = projectDoc.get("codeAnalysisDate").toDate().toLocaleString();
    let managerUsername = projectDoc.get("managerusername");
    let githubLink = projectDoc.get("githublink");
    let devUsernames: string[] = []
    for (const developer of projectDoc.get("developerusernames")){
        devUsernames.push(developer);
    }
    let status = "Not at Risk";
    if (projectDoc.get("atRisk")){
        status = "At risk";
    };
    return {
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
        status: status
    };
}

// async function getDeadlines() {
//     type DeadlinePair = {[key: string]: string };
// 	let deadlineList: DeadlinePair[] = [];
//     const db = getFirestore(app);
//     const ps = collection(db, 'projects');
//     const projects = query(ps, where("complete", "==", false), orderBy("deadline"));
//     const querySnapshot = await getDocs(projects);
//     querySnapshot.forEach((project) => {
//         let deadlinePair = {
//             name: project.data().name,
//             deadline: project.data().deadline.toDate().toLocaleString()
//         };
//         deadlineList.push(deadlinePair);
//     });
//     return JSON.stringify(deadlineList);
// }
