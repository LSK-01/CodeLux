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
    Timestamp,
    getDoc
} from "firebase/firestore";
import type { PageServerLoad } from "../login/$types";
import type { user } from "../../user";
import { redirect } from "@sveltejs/kit";

// Function to load data
export const load: PageServerLoad = async ({ cookies, url }) => {
    // Get user cookie
    const cookie = cookies.get('user');

    // Redirect user to log in page if cookie undefined
    if (cookie == undefined) {
        throw redirect(302, '/login');
    }

    // Convert JSON user to custom user datatype
    let user: user = JSON.parse(cookie);

    // If we have been redirected from a github authentication
    // Finish by getting the OAuth code, writing to firebase, rebuilding to user cookie, and redirecting back to the proj specific page

    // Check if code exists
    const code = url.searchParams.get("code");

    // If code exists
    if (code != null) {
        // Get state from search parameters
        const state = url.searchParams.get("state")!;

        // Get response
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

        // Get token
        const tokenObj = await response.json();
        const token = tokenObj.access_token;

        user.githubToken = token;
        // Set cookies
        cookies.set("user", JSON.stringify(user));

        // Get firestore instance
        const db = getFirestore(app);

        // Set github token
        await setDoc(doc(db, "users", user.uid), {
            githubToken: token,
        });

        // Redirect user to correct project page
        throw redirect(303, "/project_overview?id=" + state);
    }

    // Get firebase instance
    const db = getFirestore(app);
    // Get projects from database
    const projects = collection(db, "projects");

    // Get all ongoing projects managed by the user
    const q1 = query(
        projects,
        where("managerusername", "==", user.username), 
        where("complete", "==", false)
    );
    // Execute query
    const querySnapshot1 = await getCountFromServer(q1);
    // Get count of above projects
    const totalManaging = querySnapshot1.data().count;

    // Get all ongoing projects where the user is a developer
    const q2 = query(
        projects,
        where("developerusernames", "array-contains", user.username), 
        where("complete", "==", false)
    );
    // Execute query
    const querySnapshot2 = await getCountFromServer(q2);
    // Get count of above projects
    const totalNotManaging = querySnapshot2.data().count;

    // Get total number of ongoing projects the user is on
    const totalProjects = totalManaging + totalNotManaging;

    // Execute functions to get other values
    const surveys = await getSurveys(user);
    const tasks = await _getTasks(user);
    const atRisk = await getAtRisk(user);
    
    // Return all data
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

// Function to get at risk projects
async function getAtRisk(user: user){
    let atRiskList: any[] = [];

    // Get Firestore instance
    const db = getFirestore(app);

    // Get projects collection from database
    const projects = collection(db, "projects");

    // Query to get all ongoing projects the user manages that are at risk
    const q1 = query(
        projects,
        where("managerusername", "==", user.username),
        where("atRisk", "==", true),
        where("complete", "==", false)
    );

    // Execute query
    const querySnapshot1 = await getCountFromServer(q1);

    // Get number of at risk projects
    const atRisk = querySnapshot1.data().count;

    // Return at risk projects
    return atRisk
}

// Function to get projects with surveys due
async function getSurveys(user : user) {
    let surveyList: any[] = [];
  
    // Get firestore instance
    const db = getFirestore(app);

    // Get all projects from database
    const ps = collection(db, "projects");

    // Query to find all ongoing projects the user manages
    const q1 = query(
      ps,
      where("managerusername", "==", user.username),
      where("complete", "==", false)
    );

    // Query to find all ongoing projects where the user is a developer
    const q2 = query(
      ps,
      where("developerusernames", "array-contains", user.username),
      where("complete", "==", false)
    );

    // Execute query
    const querySnapshot1 = await getDocs(q1);
  
    // Calculating times
    const currentTime = Timestamp.now();
    const weekOldTimestamp = Timestamp.fromMillis(currentTime.toMillis() - 604800000);

    // Get all manager projects that have not had surveys answered in the last week
    querySnapshot1.forEach(async (project) => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const lastAnsweredSurvey = docSnap.data()![project.id];

      if (lastAnsweredSurvey == undefined || lastAnsweredSurvey < weekOldTimestamp) {
        surveyList.push({
          projectName: project.data().projectname,
          projectID: project.id,
          manager: true
        })
      }
    });
  
    // Execute query
    const querySnapshot2 = await getDocs(q2);

    // Get all developer projects that have not had surveys answered in the last week
    querySnapshot2.forEach(async (project) => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const lastAnsweredSurvey = docSnap.data()![project.id];
  
      if (lastAnsweredSurvey == undefined || lastAnsweredSurvey < weekOldTimestamp) {
        surveyList.push({
            projectName: project.data().projectname,
            projectID: project.id,
            manager: false
        })
      }
    });
    return surveyList;
  }

// Function to get tasks
export async function _getTasks(user:user) {
    let taskList: any[] = [await getAnalysisTasks(user)];
    return taskList.flat(1);
}

// Function to get analysis tasks
async function getAnalysisTasks(user: user) {
    let analysisTaskList: any[] = [];

    // Get firestore instance
    const db = getFirestore(app);

    // Get projects collection
    const ps = collection(db, "projects");

    const cutoff = new Date();

    // Get date from 7 days ago
    cutoff.setDate(cutoff.getDate()-7);

    // Get all ongoing manager projects where the code HAS NOT been analysed in the last 7 days
    const q = query(ps, where("managerusername", "==", user.username), where("complete","==",false), where("codeAnalysisDate", "<", cutoff), orderBy("codeAnalysisDate"));

    // Execute query
    const querySnapshot = await getDocs(q);
    const currentTime = new Date().valueOf();

    querySnapshot.forEach((project) => {
        const analysisAge = Math.round((currentTime - project.data().codeAnalysisDate.toDate())/86400000)
        analysisTaskList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            title: "Run code analysis for "+project.data().projectname,
            text: analysisAge+" days since last analysis",
            projectDeadline: project.data().deadline.toDate()
        });
    });

    // Return projects that need code analysis
    return analysisTaskList;
}

// Function to get the deadlines for each project
async function getDeadlines(user: user) {
    let deadlineList: any[] = [];

    // Get firestore instance
    const db = getFirestore(app);

    // Get projects collection
    const ps = collection(db, "projects");

    // Get all managed projects ordered by deadline
    const q1 = query(ps, where("managerusername", "==", user.username), where("complete","==",false), orderBy("deadline"));

    // Get all developer projects ordered by deadline
    const q2 = query(ps, 
        where("developerusernames", "array-contains", user.username), 
        where("complete","==",false), 
        orderBy("deadline"));

    // Execute query
    const querySnapshot1 = await getDocs(q2);

    // Add projects to return array
    querySnapshot1.forEach((project) => {
        deadlineList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            deadline: project.data().deadline.toDate(),
        });
    });

    // Execute query
    const querySnapshot2 = await getDocs(q1);

    // Add projects to return array
    querySnapshot2.forEach((project) => {
        deadlineList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            deadline: project.data().deadline.toDate(),
        });
    });

    // Return deadline list
    return deadlineList;
}
