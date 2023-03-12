<script lang="ts">
    import Tile from "./Tile.svelte";
    import Button from "../../Button.svelte";
    import "../../styles.css";
    import { goto } from "$app/navigation";

    let text = "";
    let question_num = 0;
    let questions_new = [
        "Project Name",
        "Project Description",
        "Project Type",
        "Manager Username",
        "Developer Usernames",
        "Github Link",
/*         "Customer Contact Frequency",
 */        "Budget",
        "Start Date",
        "Deadline",
    ];
    const projectTypes = [
        "All",
        "Ci_light",
        "Cupcake",
        "Documentation",
        "Dotnet",
        "Go",
        "Java",
        "PHP",
        "Python",
        "Ruby",
        "Rust",
        "Salesforce",
        "Security",
        "Swift",
        "Terraform",
    ];

    handleReset();

    let answers: string[][] = [];

    const handleSubmit = async () => {
        answers.push([
            questions_new[question_num].toLowerCase().replace(/\s/g, ""),
            text,
        ]);
        text = "";

        question_num += 1;

        if (question_num == questions_new.length) {
            const response = await fetch("/addProj", {
                method: "POST",
                body: JSON.stringify(answers),
                headers: {
                    "content-type": "application/json",
                },
            });

            const data = await response.json();
            if (!data) {
                alert("Issue adding the project");
                handleReset();
            }
            // handleReset();
            goto(`/project_overview?id=${data.projectID}`);
        }
    };

    function handleReset() {
        question_num = 0;
    }
</script>

<div id="wrapper">
    <Tile>
        <h1 on:load={handleReset}>Add Project</h1>
        <header>
            <h2>{questions_new[question_num]}</h2>
        </header>

        <form on:submit|preventDefault={handleSubmit}>
            {#if questions_new[question_num] == "Project Type"}
                <select bind:value={text} data-testid="listbox">
                    {#each projectTypes as type}
                        <option value={type}>{type}</option>
                    {/each}
                </select>
            {:else if questions_new[question_num] == "Start Date" || questions_new[question_num] == "Deadline"}
                <input type="date" bind:value={text}>
            {:else if questions_new[question_num] == "Budget"}
                <input type="number" min="0" step="0.01" bind:value={text} placeholder="Answer here" required/>
<!--             {:else if questions_new[question_num] == "Customer Contact Frequency"}
                <input type="number" min="0" step="0.01" bind:value={text} placeholder="Answer here (per week)"/> -->
            {:else if questions_new[question_num] == "Github Link"}
                <input type="url" bind:value={text} placeholder="Answer here" required/>
            {:else}
                <input type="text" bind:value={text} placeholder="Answer here" required/>
            {/if}
            <br />
            <div class="buttonContainer">
                <Button>Send</Button>
                <Button click={handleReset}>Restart</Button>
            </div>
        </form>
    </Tile>
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    /* .input-group {
        display: flex;
        flex-direction: row;
        border: 1px solid #ccc;
        background-color: #FFFFFF;
        padding: 8px 10px;
        border-radius: 8px;
        margin-top: 15px;
    } */

    input, select {
        width: 100%;
        border: 1px solid var(--fg3);;
        background-color: var(--fg3);
        padding: 10px;
        border-radius: 10px;
    }

    input:focus, select:focus {
        outline: none;
        background-color: var(--fg2);
    }

    .buttonContainer {
        display: flex;
        flex: 0 1;
        gap: 10px;
    }

    #wrapper {
        margin: 10px 10vw;
        border-radius: 10px;
    }
</style>
