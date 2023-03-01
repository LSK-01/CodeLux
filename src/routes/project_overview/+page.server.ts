import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import type { PageServerLoad } from "../login/$types";
import type { Actions } from '@sveltejs/kit';
import { Octokit } from "@octokit/rest";
import fs from "fs";

export const load: PageServerLoad = async ({params}) => {
    let name = "";
    let desc = "";
    let deadline = "";
    let startDate = "";
    let budget = 0;
    let codeAnalysisScore = 0;
    let codeAnalysisDate = "";
    let managerUsername = "";
    let githubLink = "";
    let devUsernames: string[] = []
    let status = "Not at risk";
    const db = getFirestore(app);
    const project = doc(db, "projects", "jbyYPtjz82qsybRuVYlb");
    const projectDoc = await getDoc(project);
    name = projectDoc.get("projectname");
    desc = projectDoc.get("projectdescription");
    deadline = projectDoc.get("deadline").toDate().toLocaleString();
    startDate = projectDoc.get("startdate").toDate().toLocaleString();
    budget = Math.round(projectDoc.get("budget") * 100) / 100;
    // codeAnalysisScore = projectDoc.get("codeAnalysisScore")*100;
    // codeAnalysisDate = projectDoc.get("codeAnalysisDate").toDate().toLocaleString();
    managerUsername = projectDoc.get("managerusername");
    githubLink = projectDoc.get("githublink");
    for (const developer of projectDoc.get("developerusernames")){
        devUsernames.push(developer);
    }
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
export const actions: Actions = {
    github: async ({ cookies, request }) => {

        const octokit = new Octokit({
          auth: "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",
        });
    
        const baseTree = await octokit.request("GET /repos/{owner}/{repo}/branches/main", {
            owner: "LSK-01",
            repo: "Hetris",
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
        });
    
        //contains all repo files (they will be of type 'blob')
        const response = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{treesha}?recursive=1", {
          owner: "LSK-01",
          repo: "Hetris",
          treesha: baseTree.data.commit.sha,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
    
        //@ts-ignore
        //filter everything which istn a file
        const fileObjects = response.data.tree.filter((fileObj) => fileObj.type === "blob");
    
        let filenames: string[] = [];
        //@ts-ignore
        const filesBase64 = await Promise.all(fileObjects.map(async (fileObj) => {
    
            filenames.push(fileObj.path.split('/').at(-1));
            return octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
                owner: 'LSK-01',
                repo: 'Hetris',
                file_sha: fileObj.sha,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
          }));
    
          for (let i = 0; i < filesBase64.length; i++) {
    
            fs.writeFile(__dirname + '/projectCode/' + filenames[i], Buffer.from(filesBase64[i].data.content,'base64').toString(), {flag: 'w'}, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
          }
    
    
    
        return { success:  true};
      },
};
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
