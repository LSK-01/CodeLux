import { error, json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { Octokit } from "@octokit/rest";
import { getFirestore } from "firebase/firestore";
import { app } from "../../hooks.server";

export const POST = (async ({ request }) => {
  const octokit = new Octokit({
    auth: "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",
  });

  //first get number of commits
  const commits = await octokit.request(
    "GET /repos/{owner}/{repo}/commits?per_page={per_page}",
    {
      owner: "LSK-01",
      repo: "CS261",
      per_page: 1,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  //get the 'last page' link
  const linkHeader = commits.headers.link!;
  const link = linkHeader.substring(
    linkHeader.lastIndexOf("<") + 1,
    linkHeader.lastIndexOf(">")
  );
  //get page=xyz
  const numCommits = Number(link.substring(link.lastIndexOf("=") + 1));
  console.log('numcommits', numCommits);

//write to firestore


  return json({ success: true });
}) satisfies RequestHandler;
