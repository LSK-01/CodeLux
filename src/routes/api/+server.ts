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
  limit,
} from "firebase/firestore";

export const POST = (async ({ request }) => {
  // Wait for JSON datta
  const data = await request.json();
  // Get Firestore instance
  const db = getFirestore(app);
  // Initialise empty response
  const resp = {};
  // Data will contain either a project name or a 'success' field t/f, along with a numProjects field
  // We either query db for the project and return metrics, or query db for first x number of successful /failed projects
  if (data.hasOwnProperty("projectName")) {
    // Return metrics + ids for all projects with this name
    const q = query(
      collection(db, "projects"),
      where("projectname", "==", data.projectName)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const document = doc.data();
      if (document.complete) {
        //@ts-ignore
        resp[document.projectname] = {
          ...document.smetrics,
          success: document.success,
        };
      }
    });
  } else if (
    data.hasOwnProperty("success") &&
    data.hasOwnProperty("numProjects")
  ) {
    // Return first x number of successful/failed projects
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
      resp[doc.data().projectname] = doc.data().smetrics;
    });
  }

  return json(JSON.stringify(resp));
}) satisfies RequestHandler;
