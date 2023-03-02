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
        where("atRisk", "==", true),
        where("complete", "==", false)
    );
    const querySnapshot1 = await getCountFromServer(q1);
    let atRisk = querySnapshot1.data().count;
    const q2 = query(
        projects,
        where("managerusername", "==", user.username),
        where("atRisk", "==", false),
        where("complete", "==", false)
    );
    const querySnapshot2 = await getCountFromServer(q2);
    let notAtRisk = querySnapshot2.data().count;
    return {
        atRisk: atRisk,
        notAtRisk: notAtRisk,
        withSurveys: 2,
        withoutSurveys: 5,
        withTasks: 4,
        withoutTasks: 4,
        surveyList: await getSurveys(),
        taskList: await getTasks(),
        deadlineList: await getDeadlines(user),
    };
};

async function getSurveys() {
    let surveyList: any[] = [];
    const db = getFirestore(app);
    const surveys = collection(db, "surveys");
    const querySnapshot = await getDocs(surveys);
    querySnapshot.forEach((survey) => {
        surveyList.push({
            projectID: survey.data().projectID,
            projectName: survey.data().projectName,
        });
    });
    return surveyList;
}

async function getTasks() {
    let taskList: any[] = [];
    const db = getFirestore(app);
    const tasks = collection(db, "tasks");
    const querySnapshot = await getDocs(tasks);
    querySnapshot.forEach((task) => {
        taskList.push({
            projectID: task.data().projectID,
            projectName: task.data().projectName,
            text: task.data().text,
        });
    });
    return taskList;
}

async function getDeadlines(user: user) {
    let deadlineList: any[] = [];
    const db = getFirestore(app);
    const ps = collection(db, "projects");
    const q1 = query(ps, where("managerusername", "==", user.username), where("complete","==",false), orderBy("deadline"));
    const q2 = query(ps, where("developerusernames", "array-contains", user.username), where("complete","==",false), orderBy("deadline"));
    // const q1 = query(ps, where("complete", "==", false), orderBy("deadline"));
    // const q2 = query(ps, where("complete", "==", false), orderBy("deadline"));
    const querySnapshot1 = await getDocs(q2);
    querySnapshot1.forEach((project) => {
        deadlineList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            dueDate: project.data().deadline.toDate().toLocaleDateString(),
        });
    });
    const querySnapshot2 = await getDocs(q1);
    querySnapshot2.forEach((project) => {
        deadlineList.push({
            projectID: project.id,
            projectName: project.data().projectname,
            dueDate: project.data().deadline.toDate().toLocaleDateString(),
        });
    });
    return deadlineList;
}
