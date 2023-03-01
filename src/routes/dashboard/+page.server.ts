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
} from "firebase/firestore";
import type { PageServerLoad } from "../login/$types";
import type { user } from "../../user";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const cookie = cookies.get("user")!;
  if (cookie == null) {
    return {
      post: {
        atRisk: 0,
        notAtRisk: 0,
        withSurveys: 0,
        withoutSurveys: 0,
        withTasks: 0,
        withoutTasks: 0,
        surveyList: {},
        taskList: {},
        deadlineList: {},
      },
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
        githubToken: token
      });
      console.log('here! ', state);
    throw redirect(303, "/project_overview?id=" + state);
  }

  let atRisk: number = 0;
  let notAtRisk: number = 0;
  const db = getFirestore(app);
  const projects = collection(db, "projects");
  const q1 = query(
    projects,
    where("managerusername", "==", user.username),
    where("atRisk", "==", true),
    where("complete", "==", false)
  );
  const querySnapshot1 = await getCountFromServer(q1);
  atRisk = querySnapshot1.data().count;
  const q2 = query(
    projects,
    where("managerusername", "==", user.username),
    where("atRisk", "==", false),
    where("complete", "==", false)
  );
  const querySnapshot2 = await getCountFromServer(q2);
  notAtRisk = querySnapshot2.data().count;
  return {
    post: {
      atRisk: atRisk,
      notAtRisk: notAtRisk,
      withSurveys: 2,
      withoutSurveys: 5,
      withTasks: 4,
      withoutTasks: 4,
      surveyList: await getSurveys(user),
      taskList: await getTasks(),
      deadlineList: await getDeadlines(user),
    },
  };
};

async function getSurveys(user : user) {
  let surveyList: string[] = [];
  let userProjects : any[] = [];

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
  querySnapshot1.forEach((project) => {
    userProjects.push({
      projectName: project.data().projectname,
      manager: true
      })});
  const querySnapshot2 = await getDocs(q1);
  querySnapshot2.forEach((project) => {
    userProjects.push({
      projectName: project.data().projectname,
      manager: false
      })});

  
  // const querySnapshot = await getDocs(surveys);
  // querySnapshot.forEach((survey) => {
  //   surveyList.push("survey.data().projectName");
  // });
  return surveyList;
}

async function getTasks() {
  type TaskPair = { [key: string]: string };
  let taskList: TaskPair[] = [];
  const db = getFirestore(app);
  const tasks = collection(db, "tasks");
  const querySnapshot = await getDocs(tasks);
  querySnapshot.forEach((task) => {
    let taskPair = {
      prjectName: task.data().projectname,
      text: task.data().text,
    };
    taskList.push(taskPair);
  });
  return JSON.stringify(taskList);
}

async function getDeadlines(user: user) {
  let deadlineList: any[] = [];
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
  const querySnapshot1 = await getDocs(q2);
  querySnapshot1.forEach((project) => {
    deadlineList.push({
      projectName: project.data().projectname,
      dueDate: project.data().deadline.toDate().toLocaleString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    });
  });
  const querySnapshot2 = await getDocs(q1);
  querySnapshot2.forEach((project) => {
    deadlineList.push({
      projectName: project.data().projectname,
      dueDate: project.data().deadline.toDate().toLocaleString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    });
  });
  return { deadlineList };
}
