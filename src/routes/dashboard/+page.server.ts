import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageLoad} */
export async function load() {
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

        },
    };
}

async function getSurveys() {
	let surveyList: string[] = [];
    const db = getFirestore(app);
    const surveys = collection(db, 'surveys');
    const querySnapshot = await getDocs(surveys);
    querySnapshot.forEach((survey) => {
        surveyList.push("ProjectName")
    });
    return surveyList;
}

async function getTasks() {
	type TaskPair = {[key: string]: string };
	let taskList: string[] = [];
    const db = getFirestore(app);
    const tasks = collection(db, 'tasks');
    const querySnapshot = await getDocs(tasks);
    querySnapshot.forEach((task) => {
        taskList.push("");
    });
    return taskList;
}

