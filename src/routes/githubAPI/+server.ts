import { error, json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { app } from "../../hooks.server";
import { Octokit } from "@octokit/rest";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

// Get filename
const __filename = fileURLToPath(import.meta.url);

// Get directory name
const __dirname = dirname(__filename);


export const POST = (async ({ request }) => {
  // Get data
  const data = await request.json();

  // Github links always have the form username/repo
  const githubInfo = data.link.split("/").slice(-2);
  const username = githubInfo[0];
  const repo = githubInfo[1];

  // Initialise Octokit
  const octokit = new Octokit({
    auth: String(data.githubToken),
  });

  // First get number of commits
  const commits = await octokit.request(
    "GET /repos/{owner}/{repo}/commits?per_page={per_page}",
    {
      owner: username,
      repo: repo,
      per_page: 1,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  // Get the 'last page' link
  const linkHeader = commits.headers.link!;
  const link = linkHeader.substring(
    linkHeader.lastIndexOf("<") + 1,
    linkHeader.lastIndexOf(">")
  );

  // Get page=xyz
  const numCommits = Number(link.substring(link.lastIndexOf("=") + 1));
  console.log("numcommits", numCommits);

  //then get latest 10 commit messages
  const comments = await octokit.request('GET /repos/{owner}/{repo}/comments?per_page={per_page}', {
    owner: username,
    repo: repo,
    per_page:10,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  let commentsArr: string[] = []
  
  comments.data.forEach((obj:any) => {
    commentsArr.push(obj.body)
  });

  //get a senti anal score from the backend
  const sentiScoreRes = await fetch(
    "https://cs261-backend-7r5ljue3ha-no.a.run.app/sentiment",
    {
      method: "POST",
      body: JSON.stringify({ sentiment: commentsArr }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const sentiScore = await sentiScoreRes.json();
  //Write to the db
  const db = getFirestore(app);
  const docref = doc(db, "projects", data.id);

  await updateDoc(docref, {
    numCommits: numCommits,
    sentiAnal: sentiScore.average_sentiment
  });

  const baseTree = await octokit.request(
    "GET /repos/{owner}/{repo}/branches/main",
    {
      owner: username,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  // Contains all repo files (they will be of type 'blob')
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{treesha}?recursive=1",
    {
      owner: username,
      repo: repo,
      treesha: baseTree.data.commit.sha,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  // Filter everything which isn't a file

  const fileObjects = response.data.tree.filter(
    //@ts-ignore
    (fileObj) => fileObj.type === "blob"
  );

  let filenames: string[] = [];
  const filesBase64 = await Promise.all(
    fileObjects.map(async (fileObj:any) => {
      filenames.push(fileObj.path.split("/").at(-1));
      return octokit.request("GET /repos/{owner}/{repo}/git/blobs/{file_sha}", {
        owner: username,
        repo: repo,
        file_sha: fileObj.sha,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    })
  );

  fs.mkdirSync(__dirname + "/projectCode/" + data.id, { recursive: true });
  for (let i = 0; i < filesBase64.length; i++) {
    fs.writeFile(
      __dirname + "/projectCode/" + data.id + "/" + filenames[i],
      Buffer.from(filesBase64[i].data.content, "base64").toString(),
      { flag: "w" },
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }
    );
  }

  return json({ success: true });
}) satisfies RequestHandler;
