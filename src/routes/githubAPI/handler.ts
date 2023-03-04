import { browser } from "$app/environment";
import { goto } from "$app/navigation";

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