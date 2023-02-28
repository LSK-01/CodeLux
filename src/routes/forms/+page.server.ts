import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore,collection, getDocs, query, where } from 'firebase/firestore';


// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
    let returnArray : any[] = [];
    const db = getFirestore(app);
    const questionsRef = collection(db, 'surveyquestions');
    const q = query(questionsRef, where("qtype", "==", "employee"));
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            returnArray.push({ question: doc.data().question, qid: doc.data().id });
        });
    return { post: returnArray }
    }
