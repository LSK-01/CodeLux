import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where, serverTimestamp } from 'firebase/firestore';


// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

export const prerender = false;

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

import type { PageServerLoad, Actions } from './$types';

export const actions = {
    store: async ({ cookies, request}) => {
        const data = await request.formData();
        const cookie = cookies.get('user')!;

        const user = JSON.parse(cookie);
        const answers : any[] = [];
        
        const db = getFirestore(app);
        for (const element of data.entries()) {
            answers.push({ qid: element[0], answer: element[1]});
        }
        console.log(answers);
        await addDoc(collection(db,"surveyanswers"), {
            time: serverTimestamp(),
            answers: answers,
            // q1: data.get("q1"),
            // q2: data.get("q2"),
            // q3: data.get("q3"),
            userid: user.uid,
            username: user.username,
          });

    }
  } satisfies Actions;


