import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import type { PageServerLoad, Actions } from './$types';
import type { user } from "../../user";
import { redirect } from "@sveltejs/kit";


// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

export const prerender = false;

export const load: PageServerLoad = async ({cookies, url}) => {
    let returnArray : any[] = [];
    let questions : any[] = [];

    const cookie = cookies.get("user")!;
    const user: user = JSON.parse(cookie);
    const db = getFirestore(app);

    const projID = url.searchParams.get("id")!;
    const project = doc(db, "projects", projID);
    const projectDoc = await getDoc(project);
    //check if user is manager or employee for the project
    let managerUsername = projectDoc.get("managerusername");

    returnArray.push(projectDoc.get("projectname"));

    const questionsRef = collection(db, 'surveyquestions');

    if (managerUsername === user.username){
        const querySnapshot1 = await getDocs(questionsRef);
        querySnapshot1.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            questions.push({ question: doc.data().question, qid: doc.data().id });
        });
    }
    else{
        const q = query(questionsRef, where("qtype", "==", "employee"));
        const querySnapshot2 = await getDocs(q);
            querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                questions.push({ question: doc.data().question, qid: doc.data().id });
            });
    }
    returnArray.push(questions);
    return { post: returnArray }
    }


export const actions = {
    default: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const cookie = cookies.get('user')!;

        const user = JSON.parse(cookie);
        const answers : any[] = [];
        const projID = url.searchParams.get("id")!;

        console.log(projID);
        
        const db = getFirestore(app);
        for (const element of data.entries()) {
            answers.push({ qid: element[0], answer: element[1]});
        }
        console.log(answers);
        await addDoc(collection(db,"surveyanswers"), {
            projectid : projID,
            time: serverTimestamp(),
            answers: answers,
            userid: user.uid,
            username: user.username,
          });
        throw redirect(303, "/surveycomplete"); //might change this
    }
  } satisfies Actions;


