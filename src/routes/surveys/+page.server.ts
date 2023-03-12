import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, query, where, serverTimestamp, updateDoc, increment, Timestamp } from 'firebase/firestore';
import type { PageServerLoad, Actions } from './$types';
import type { user } from "../../user";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({cookies, url}) => {
    let returnArray : any[] = [];
    let questions : any[] = [];

    const cookie = cookies.get('user');
    if (cookie == undefined) {
        throw redirect(302, '/login');
    }
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
            questions.push({ question: doc.data().question, metric: doc.data().smetric, qid: doc.data().id });
        });
    }
    else{
        const q = query(questionsRef, where("qtype", "==", "employee"));
        const querySnapshot2 = await getDocs(q);
            querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                questions.push({ question: doc.data().question, metric: doc.data().smetric, qid: doc.data().id });
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

        //add numAnsweredMetricName and metricNameTotal: to project document
        //make the object first
        let fields = {};

        for (const element of data.entries()) {
            const metricname = element[0].split(":")[0].toLowerCase().replace(/ /g,'_');
            //@ts-ignore
            fields[metricname] = Number(fields[metricname] ?? 0 + element[1]);
            //@ts-ignore
            fields[metricname + "_answered"] = fields[metricname + "_answered"] ?? 0 + 1;
        }
        console.log("ree: ", fields);
        Object.keys(fields).forEach((key, index) => {
            //@ts-ignore
            fields[key] = increment(fields[key]);
        });

        const db = getFirestore(app);

        await updateDoc(doc(db, "projects", "metrics:" + projID), fields)

        //update users document
        console.log('updating user document: ', user.uid, projID)
        await updateDoc(doc(db, "users", user.uid), { [projID]: Timestamp.now() });
        throw redirect(303, "/surveycomplete");
/*         console.log(projID);
        
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
        throw redirect(303, "/surveycomplete"); //might change this */
    }
  } satisfies Actions;


