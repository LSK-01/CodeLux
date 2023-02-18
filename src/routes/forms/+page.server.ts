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

    //will be different based on employee or manager
    // const questions = [
    //     "I have received adequate training to help me complete the project", 
    //     "My manager supports me in any training I want to undertake to help me perform my role better", 
    //     "My team is easy to communicate with", 
    //     "My team work well together", 
    //     "I feel recognised and valued for my role and contribution to this project", 
    //     "I enjoy being a part of my company’s culture", 
    //     "I feel confident the project will be finished on time",
    //     "My team have the resources and skills necessary to complete the project", 
    //     "I feel satisfied with the frequency of feedback received from the customer" 
    // ];
    // return questions;