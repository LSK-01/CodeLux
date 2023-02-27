import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { PageServerLoad } from "../login/$types";

export const load: PageServerLoad = async () => {
    let name = "";
    let deadline = "";
    let budget = 0;
    let status = "Not at risk";
    const db = getFirestore(app);
    const projects = collection(db, 'projects');
    const querySnapshot = await getDocs(projects);
    querySnapshot.forEach((project) => {
        name = project.data().name;
        deadline = project.data().deadline.toDate().toLocaleString();
        budget = project.data().budget;
        if (project.data().atRisk){
            status = "At risk";
        };
    });
    return {
        name: name,
        deadline: deadline,
        budget: budget,
        status: status
    };
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
