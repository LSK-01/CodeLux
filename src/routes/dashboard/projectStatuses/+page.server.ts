import { dev } from '$app/environment';
import { app } from '../../../hooks.server';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

export const csr = dev;

export const prerender = true;

export async function load() {
    let projectCount : number = 0;
    const db = getFirestore(app);
    const projects = collection(db, 'projects');
    const querySnapshot = await getDocs(projects);
    querySnapshot.forEach((doc) => {
        projectCount++;
    });
    console.log(projectCount)
    return {post: projectCount}
}