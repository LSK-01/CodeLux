import { dev } from '$app/environment';
import { app } from '../../../hooks.server';
import { getFirestore,collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import type { PageServerLoad } from "../../login/$types";
import type { user } from "../../../user";

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageServerLoad = async ({cookies, params}) => {
    const cookie = cookies.get('user')!;

    if (params.slug === 'all'){
        if (cookie == null) {
            return {
                post : ["All projects",[]],
            }
        }
        else{
            const user = JSON.parse(cookie);

            return { post : getAllProjects(user)};
        }
    }
    if (params.slug === 'atrisk'){
        if (cookie == null) {
            return {
                post : ["Projects at risk",[]],
            }
        }
        else{
            const user = JSON.parse(cookie);

            return { post : getAtRiskProjects(user)};
        }
}

async function getAllProjects(user: user){
    let returnArray : any[] = ["All projects"];
    let projects : any[] = [];
    
    const db = getFirestore(app);
    const projectsRef = collection(db, 'projects');
    const q1 = query(projectsRef, where("managerusername", "==", user.username), where("complete","==",false), orderBy("deadline","asc"));
    const q2 = query(projectsRef, where("developerusernames", "array-contains", user.username), where("complete","==",false), orderBy("deadline","asc"));
    const q3 = query(projectsRef, where("managerusername", "==", user.username), where("complete","==",true), orderBy("deadline","asc"));
    const q4 = query(projectsRef, where("developerusernames", "array-contains", user.username), where("complete","==",true), orderBy("deadline","asc"));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({id: doc.id, projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: true})
    });
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({id: doc.id, projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: false})
    });
    const querySnapshot3 = await getDocs(q3);
    querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({id: doc.id, projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: true})
    });
    const querySnapshot4 = await getDocs(q4);
    querySnapshot4.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push({id: doc.id, projectName: doc.data().projectname, dueDate: doc.data().deadline.toDate().toLocaleString("en-GB",{
            year: "numeric",
            month: "numeric",
            day: "numeric",
            }), managerBool: false})
    });
    returnArray.push(projects);
    return returnArray;
}

async function getAtRiskProjects(user: user){
    let returnArray : any[] = ["Projects at risk"];
    let projects : any[] = [];

    const db = getFirestore(app);
    const projectsRef = collection(db, 'projects');
    const q1 = query(projectsRef, where("managerusername", "==", user.username), where("complete","==",false), where("atRisk","==",true), orderBy("deadline","asc"));
    const q2 = query(projectsRef, where("developerusernames", "array-contains", user.username), where("complete","==",false), where("atRisk","==",true), orderBy("deadline","asc"));
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
    returnArray.push(projects);
    return returnArray ;
}
}
