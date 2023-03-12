import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, query, where, serverTimestamp, updateDoc, increment, Timestamp } from 'firebase/firestore';
import type { PageServerLoad, Actions } from './$types';
import type { user } from "../../user";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({cookies, url}) => {
    let returnArray : any[] = [];
    let questions : any[] = [];

    // Get cookie
    const cookie = cookies.get('user');

    // Redirect user to login if cookie undefined
    if (cookie == undefined) {
        throw redirect(302, '/login');
    }

    // Get user from JSON data
    const user: user = JSON.parse(cookie);

    // Get firestore instance
    const db = getFirestore(app);

    // Get project info from database
    const projID = url.searchParams.get("id")!;
    const project = doc(db, "projects", projID);
    const projectDoc = await getDoc(project);

    // Check if user is manager or employee for the project
    let managerUsername = projectDoc.get("managerusername");

    returnArray.push(projectDoc.get("projectname"));

    const questionsRef = collection(db, 'surveyquestions');

    // Get correct questions for user
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
        // Get data
        const data = await request.formData();

        // Get cookie
        const cookie = cookies.get('user')!;

        // Get user from JSON
        const user = JSON.parse(cookie);

        const answers : any[] = [];

        // Get project ID from url
        const projID = url.searchParams.get("id")!;

        // Add numAnsweredMetricName and metricNameTotal: to project document
        // Make the object first
        let fields = {};

        for (const element of data.entries()) {
            const metricname = element[0].split(":")[0].toLowerCase().replace(/ /g,'_');
            //@ts-ignore
            fields[metricname] = Number(fields[metricname] ?? 0 + element[1]);
            //@ts-ignore
            fields[metricname + "_answered"] = fields[metricname + "_answered"] ?? 0 + 1;
        }
        Object.keys(fields).forEach((key, index) => {
            //@ts-ignore
            fields[key] = increment(fields[key]);
        });

        const db = getFirestore(app);

        // Add metric data to database
        await updateDoc(doc(db, "projects", "metrics:" + projID), fields)

        // Update users document
        await updateDoc(doc(db, "users", user.uid), { [projID]: Timestamp.now() });
        throw redirect(303, "/surveycomplete");
    }
  } satisfies Actions;


