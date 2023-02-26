// @ts-nocheck
import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where, serverTimestamp } from 'firebase/firestore';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

/** */
export async function load() {
    let questions : string[] = [];
    const db = getFirestore(app);
    const questionsRef = collection(db, 'surveyquestions');
    const q = query(questionsRef, where("qtype", "==", "employee"));
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            questions.push(doc.data().question);
        });
    
    return { post: questions }
    }

import type { PageServerLoad, Actions } from './$types';

export const actions = {
    store: async ({ cookies, request}) => {
        const data = await request.formData();
        const userid = cookies.get('uid');
        const email = cookies.get('email');
        
        const db = getFirestore(app);
        console.log(data);
        for (const value of data.entries()) {
            console.log(value);
          }
        await addDoc(collection(db,"surveyanswers"), {
            time: serverTimestamp(),
            q1: data.get("q1"),
            q2: data.get("q2"),
            q3: data.get("q3"),
            userid: userid,
            email: email,
          });

    }
  } satisfies Actions;


