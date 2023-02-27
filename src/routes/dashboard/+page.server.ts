import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { PageServerLoad } from "../login/$types";

export const load: PageServerLoad = async () => {
    let atRisk : number = 0;
    let notAtRisk : number = 0;
    const db = getFirestore(app);
    const projects = collection(db, 'projects');
    const querySnapshot = await getDocs(projects);
    
    querySnapshot.forEach((project) => {
        if (project.get('atRisk')) {
            atRisk++;
        } else {
            notAtRisk++;
        }
    });
    return {
        post: {
            atRisk: atRisk,
            notAtRisk: notAtRisk,
            withSurveys: 2,
            withoutSurveys: 5,
            withTasks: 4,
            withoutTasks: 4,
            surveyList: await getSurveys(),
            taskList: await getTasks(),
            deadlineList: await getDeadlines(),
        },
    };
}

async function getSurveys() {
	let surveyList: string[] = [];
    const db = getFirestore(app);
    const surveys = collection(db, 'surveys');
    const querySnapshot = await getDocs(surveys);
    querySnapshot.forEach((survey) => {
        surveyList.push("survey.data().projectName")
    });
    return surveyList;
}

async function getTasks() {
	type TaskPair = {[key: string]: string };
	let taskList: TaskPair[] = [];
    const db = getFirestore(app);
    const tasks = collection(db, 'tasks');
    const querySnapshot = await getDocs(tasks);
    querySnapshot.forEach((task) => {
        let taskPair = {
            prjectName: task.data().projectName,
            text: task.data().text
        };
        taskList.push(taskPair);
    });
    return JSON.stringify(taskList);
}

async function getDeadlines() {
    type DeadlinePair = {[key: string]: string };
	let deadlineList: DeadlinePair[] = [];
    const db = getFirestore(app);
    const ps = collection(db, 'projects');
    const projects = query(ps, where("complete", "==", false), orderBy("deadline"));
    const querySnapshot = await getDocs(projects);
    querySnapshot.forEach((project) => {
        let deadlinePair = {
            name: project.data().name,
            deadline: project.data().deadline.toDate().toLocaleString()
        };
        deadlineList.push(deadlinePair);
    });
    return JSON.stringify(deadlineList);
}
