<script lang="ts">
    import Tile from "./Tile.svelte";
    import Button from "../../Button.svelte";
    // Import global styles
    import "../../styles.css";
    import { goto } from "$app/navigation";

    // Initialising variables
    let text = ""; // Answer to current question
    let question_num = 0; // Current question number
    let questions_new = [ 
        "Project Name",
        "Project Description",
        "Project Type",
        "Manager Username",
        "Developer Usernames",
        "Github Link",
        "Budget",
        "Start Date",
        "Deadline",
    ]; // Array of project questions
    let projectTypes = [
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
    ]; // Project Types for code analysis


    // Reset question number to 0 on page load
    handleReset();

    // Array to store answers
    let answers: string[][] = [];

    // Function to handle form submission
    const handleSubmit = async () => {
        // Add the current answer to the answers array
        answers.push([
            questions_new[question_num].toLowerCase().replace(/\s/g, ""),
            text,
        ]);
        // Reset answer variable
        text = "";

        // Increment question counter
        question_num += 1;

        // If all questions have been answered
        if (question_num == questions_new.length) {
            // Sending a POST request with the answers to the server
            const response = await fetch("/addProj", {
                method: "POST",
                body: JSON.stringify(answers),
                headers: {
                    "content-type": "application/json",
                },
            });

            // Getting the response from the server
            const data = await response.json();

            // If response invalid
            if (!data) {
                // Show alert message and reset form
                alert("Issue adding the project");
                handleReset();
            }
            // Redirect to project overview page
            goto(`/project_overview?id=${data.projectID}`);
        }
    };

    // Function to reset form
    function handleReset() {
        question_num = 0;
    }
</script>

<div id="wrapper">
    <Tile>
        <!-- Sets the title of the page to "Add Project" and calls handleReset function when the page loads -->
        <h1 on:load={handleReset}>Add Project</h1>
        <!-- Displays the current question being asked to the user -->
        <header>
            <h2>{questions_new[question_num]}</h2>
        </header>

        <form on:submit|preventDefault={handleSubmit}>
            <!-- Render different input elements based on the question type -->
            {#if questions_new[question_num] == "Project Type"}
                <!-- Render dropdown with option for each project type-->
                <select bind:value={text} data-testid="listbox">
                    {#each projectTypes as type}
                        <option value={type}>{type}</option>
                    {/each}
                </select>
            <!-- Render date input field -->
            {:else if questions_new[question_num] == "Start Date" || questions_new[question_num] == "Deadline"}
                <input type="date" bind:value={text}>
            <!-- Render number input field for budget -->
            {:else if questions_new[question_num] == "Budget"}
                <input type="number" min="0" step="0.01" bind:value={text} placeholder="Answer here" required/>
            <!-- Render URL input field -->
            {:else if questions_new[question_num] == "Github Link"}
                <input type="url" bind:value={text} placeholder="Answer here" required/>
            <!-- Otherwise render text input field -->
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
