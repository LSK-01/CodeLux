import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore,collection, getDocs, query, orderBy } from 'firebase/firestore';


// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
    let projects : any[] = [];
    const db = getFirestore(app);
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy("deadline","asc"));
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            projects.push({projectName: doc.data().name, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }), managerBool: false})
        });
    return { post: projects }
}