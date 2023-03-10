import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { app } from "../../hooks.server";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";

export const POST = (async ({ request }) => {
  const data = await request.json();
  console.log("data", data);
  const db = getFirestore(app);
  const resp = {};
  // data will contain either a project name or a 'success' field t/f, along with a numProjects field
  //we either query db for the project and return metrics, or query db for first x number of successful /failed projects
  if (data.hasOwnProperty("projectName")) {
    //return metrcis+ids for all projects with this name
    const q = query(
      collection(db, "projects"),
      where("projectname", "==", data.projectname)
    );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //@ts-ignore
      resp[doc.id] = doc.data().metrics;
    });
  } else if (
    data.hasOwnProperty("success") &&
    data.hasOwnProperty("numProjects")
  ) {
    //return first x number of successful/failed projects
    const q = query(
      collection(db, "projects"),
      where("success", "==", data.success),
      orderBy("enddate", "desc"),
      limit(data.numProjects)
    );
    const resp = {};
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //@ts-ignore
      resp[doc.id] = doc.data().metrics;
    });
  }

  return json(JSON.stringify(resp))
}) satisfies RequestHandler;
