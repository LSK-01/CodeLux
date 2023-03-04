import { error, json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { app } from "../../hooks.server";
import { Octokit } from "@octokit/rest";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//redirects to dashboard - we then redirect back to the proj overview page in dashboard backend using state.
export const getToken = (projectID:string) => {
      if (browser) {
          //get the OAuth token for the user
          goto(
              "https://github.com/login/oauth/authorize?" +
                  new URLSearchParams({
                      client_id: "741e0c0a106d7fdd57f2",
                      scope: "repo",
                      state: projectID,
                  })
          );
      }
  };

//if the user has arleady authenticated with github
export const handleGetGit = async (projectID:string, githubLink:string, githubToken:string) => {
  if (githubLink === "") {
      alert("You did not add a GitHub link when adding this project.");
      return;
  }

  const response = await fetch("/githubAPI", {
      method: "POST",
      body: JSON.stringify({
          link: githubLink,
          id: projectID,
          githubToken: githubToken,
      }),
      headers: {
          "content-type": "application/json",
      },
  });

  const resJson = await response.json();
};

export const POST = (async ({ request }) => {
  const data = await request.json();
  console.log("data", data);
  //github links always have the form username/repo
  const githubInfo = data.link.split("/").slice(-2);
  const username = githubInfo[0];
  const repo = githubInfo[1];
  console.log("username and repo ", username, repo, data.user.githubToken);

  const octokit = new Octokit({
    auth: String(data.githubToken),
  });

  console.log("poo");
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
  console.log("json", baseTree);

  //contains all repo files (they will be of type 'blob')
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

  //filter everything which istn a file
  console.log("poo");

  const fileObjects = response.data.tree.filter(
    (fileObj) => fileObj.type === "blob"
  );

  let filenames: string[] = [];
  //@ts-ignore
  const filesBase64 = await Promise.all(
    fileObjects.map(async (fileObj) => {
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
  
  console.log("poo");
  fs.mkdirSync( __dirname +"/projectCode/" + data.id, { recursive: true });
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
