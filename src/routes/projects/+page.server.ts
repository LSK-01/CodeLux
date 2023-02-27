import { dev } from '$app/environment';
import { app } from '../../hooks.server';
import { getFirestore,collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import type { user } from '../../user';
import type { PageServerLoad } from "../login/$types";

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageServerLoad = async ({cookies, params}) => {
    let projects : any[] = [];
    const cookie = cookies.get('user')!;
    if (cookie == null) {
        return {
            post : projects,
        }
    }
    const user = JSON.parse(cookie);
    const db = getFirestore(app);
    const projectsRef = collection(db, 'projects');
    const q1 = query(projectsRef, where("managerusername", "==", user.username), where("complete","==",false), orderBy("deadline","asc"));
    const q2 = query(projectsRef, where("developerusernames", "array-contains", user.username), where("complete","==",false), orderBy("deadline","asc"));
    const q3 = query(projectsRef, where("managerusername", "==", user.username), where("complete","==",true), orderBy("deadline","asc"));
    const q4 = query(projectsRef, where("developerusernames", "array-contains", user.username), where("complete","==",true), orderBy("deadline","asc"));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: true})
    });
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: false})
    });
    const querySnapshot3 = await getDocs(q3);
    querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: true})
    });
    const querySnapshot4 = await getDocs(q4);
    querySnapshot4.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: false})
    });
    return { post: projects }
}