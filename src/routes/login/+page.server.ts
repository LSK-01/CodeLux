import type { Actions } from "./$types";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../hooks.server";
import type { user } from "../../user";
import { Octokit } from "@octokit/rest";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const actions = {
  login: async ({ cookies, request }) => {
    const auth = getAuth(app);

        const data = await request.formData();
        let email: string = data.get('email') as string;
        let password: string = data.get('password') as string;

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)

      let user: user = {
        email: email ?? "",
        uid: res.user.uid,
        username:
          res.user.displayName ?? email.substring(0, email.indexOf("@")),
      };

      cookies.set("user", JSON.stringify(user));

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  },

  github: async ({ cookies, request }) => {

    const octokit = new Octokit({
      auth: "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",
    });

    const baseTree = await octokit.request("GET /repos/{owner}/{repo}/branches/main", {
        owner: "LSK-01",
        repo: "Hetris",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
    });

    //contains all repo files (they will be of type 'blob')
    const response = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{treesha}?recursive=1", {
      owner: "LSK-01",
      repo: "Hetris",
      treesha: baseTree.data.commit.sha,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    //@ts-ignore
    //filter everything which istn a file
    const fileObjects = response.data.tree.filter((fileObj) => fileObj.type === "blob");

    let filenames: string[] = [];
    //@ts-ignore
    const filesBase64 = await Promise.all(fileObjects.map(async (fileObj) => {

        filenames.push(fileObj.path.split('/').at(-1));
        return octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
            owner: 'LSK-01',
            repo: 'Hetris',
            file_sha: fileObj.sha,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
      }));

      for (let i = 0; i < filesBase64.length; i++) {

        fs.writeFile(__dirname + '/projectCode/' + filenames[i], Buffer.from(filesBase64[i].data.content,'base64').toString(), {flag: 'w'}, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
      }



    return { success:  true};
  },
} satisfies Actions;
