import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageLoad} */
export async function load() {
    let atRisk : number = 0;
    let notAtRisk : number = 0;
    const db = getFirestore(app);
    const projects = collection(db, 'projects');
    const querySnapshot = await getDocs(projects);
    querySnapshot.forEach((doc) => {
        if (doc.get('atRisk')) {
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
        },
    };
}