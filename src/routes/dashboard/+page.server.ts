import { app } from "../../hooks.server";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    getCountFromServer,
    setDoc,
    doc,
    orderBy,
    Timestamp
} from "firebase/firestore";
import type { PageServerLoad } from "../login/$types";
import type { user } from "../../user";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, url }) => {
    const cookie = cookies.get("user")!;
    if (cookie == null) {
        return {
            atRisk: 0,
            notAtRisk: 0,
            withSurveys: 0,
            withoutSurveys: 0,
            withTasks: 0,
            withoutTasks: 0,
            surveyList: [],
            taskList: {},
            deadlineList: {},
        };
    }
    let user: user = JSON.parse(cookie);

    //this is if we have been redirected from a github authentication
    //finish by getting the OAuth code, writing to firebase, rebuilding to user cookie, and redirecting back to the proj specific page
    const code = url.searchParams.get("code");
    if (code != null) {
        const state = url.searchParams.get("state")!;

        const response = await fetch(
            "https://github.com/login/oauth/access_token?" +
                new URLSearchParams({
                    client_id: "741e0c0a106d7fdd57f2",
                    client_secret: "cb05b030aaf0e4b7e6270744ef5b16b477107d46",
                    code: code,
                }),
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const tokenObj = await response.json();
        const token = tokenObj.access_token;

        user.githubToken = token;
        cookies.set("user", JSON.stringify(user));

        const db = getFirestore(app);
        await setDoc(doc(db, "users", user.uid), {
            githubToken: token,
        });
        console.log("here! ", state);
        throw redirect(303, "/project_overview?id=" + state);
    }

    const db = getFirestore(app);
    const projects = collection(db, "projects");

    const q1 = query(
        projects,
        where("managerusername", "==", user.username), 
        where("complete", "==", false)
    );
    const querySnapshot1 = await getCountFromServer(q1);
    const totalManaging = querySnapshot1.data().count;

    const q2 = query(
        projects,
        where("developerusernames", "array-contains", user.username), 
        where("complete", "==", false)
    );
    const querySnapshot2 = await getCountFromServer(q2);
    const totalNotManaging = querySnapshot2.data().count;

    const totalProjects = totalManaging + totalNotManaging;

    const surveys = await getSurveys(user);
    const tasks = await _getTasks(user);
    const atRisk = await getAtRisk(user);
    
    return {
        atRisk: atRisk,
        notAtRisk: totalManaging - atRisk,
        withSurveys: surveys.length,
        withoutSurveys: totalProjects - surveys.length,
        withTasks: tasks.length,
        withoutTasks: totalProjects - tasks.length,
        surveyList: surveys,
        taskList: tasks,
        deadlineList: await getDeadlines(user),
        totalProjects: totalProjects
    };
};

async function getAtRisk(user: user){
    let atRiskList: any[] = [];
    const db = getFirestore(app);
    const projects = collection(db, "projects");
    const q1 = query(
        projects,
        where("managerusername", "==", user.username),
        where("atRisk", "==", true),
        where("complete", "==", false)
    );
    const querySnapshot1 = await getCountFromServer(q1);
    const atRisk = querySnapshot1.data().count;
    return atRisk
}

async function getSurveys(user : user) {
    let surveyList: any[] = [];
  
    const db = getFirestore(app);
    const ps = collection(db, "projects");
    const q1 = query(
      ps,
      where("managerusername", "==", user.username),
      where("complete", "==", false)
    );
    const q2 = query(
      ps,
      where("developerusernames", "array-contains", user.username),
      where("complete", "==", false)
    );
    const querySnapshot1 = await getDocs(q1);
  
    const surveyAnswers = collection(db,"surveyanswers");
  
    const currentTime = Timestamp.now();
    const weekOldTimestamp = Timestamp.fromMillis(currentTime.toMillis() - 604800000);
  
    querySnapshot1.forEach(async (project) => {
      const q3 = query(
        surveyAnswers,
        where("userid","==", user.uid),
        where("projectid","==", project.id),
        where("time",">", weekOldTimestamp),
      ); //if this is not empty a survey has been taken in the last seven days so DON'T generate survey for it
      const querySnapshot3 = await getDocs(q3);
  
      if (querySnapshot3.empty) {
        surveyList.push({
          projectName: project.data().projectname,
          projectID: project.id,
          manager: true
        })
      }
    });
  
    const querySnapshot2 = await getDocs(q2);

    querySnapshot2.forEach(async (project) => {
      const q3 = query(
        surveyAnswers,
        where("userid","==", user.uid),
        where("projectid","==", project.id),
        where("time",">", weekOldTimestamp),
      ); //if this is not empty a survey has been taken in the last seven days so DON'T generate survey for it
      const querySnapshot3 = await getDocs(q3);
  
      if (querySnapshot3.empty) {
        surveyList.push({
            projectName: project.data().projectname,
            projectID: project.id,
            manager: false
        })
      }
    });
    return surveyList;
  }

export async function _getTasks(user:user) {
    let taskList: any[] = [await getAnalysisTasks(user)];
    return taskList.flat(1);
}

async function getAnalysisTasks(user: user) {
    let analysisTaskList: any[] = [];
    const db = getFirestore(app);
    const ps = collection(db, "projects");
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate()-7);
    const q = query(ps, where("managerusername", "==", user.username), where("complete","==",false), where("codeAnalysisDate", "<", cutoff), orderBy("codeAnalysisDate"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((project) => {
        const analysisAge = Math.round((new Date().valueOf() - project.data().codeAnalysisDate.toDate())/86400000)
        analysisTaskList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            title: "Run code analysis for "+project.data().projectname,
            text: analysisAge+" days since last analysis",
            projectDeadline: project.data().deadline.toDate()
        });
    });
    return analysisTaskList;
}

async function getDeadlines(user: user) {
    let deadlineList: any[] = [];
    const db = getFirestore(app);
    const ps = collection(db, "projects");
    const q1 = query(ps, where("managerusername", "==", user.username), where("complete","==",false), orderBy("deadline"));
    const q2 = query(ps, 
        where("developerusernames", "array-contains", user.username), 
        where("complete","==",false), 
        where("deadline","<",new Date()), 
        orderBy("deadline"));
    const querySnapshot1 = await getDocs(q2);
    querySnapshot1.forEach((project) => {
        deadlineList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            deadline: project.data().deadline.toDate(),
        });
    });
    const querySnapshot2 = await getDocs(q1);
    querySnapshot2.forEach((project) => {
        deadlineList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            deadline: project.data().deadline.toDate(),
        });
    });
    return deadlineList;
}
