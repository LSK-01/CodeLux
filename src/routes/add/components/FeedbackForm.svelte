<script lang="ts">
  import Tile from "./Tile.svelte";
  import Button from "../../Button.svelte";
  import type { project } from "../project";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import "../../styles.css";

  let text = "";
  let rating = -1;
  let question_num = 0;
  let questions_new = [
    "Project Name",
    "Project Description",
    "Manager Username",
    "Developer Usernames",
    "Github link",
    "Customer Contact Frequency",
    "Budget",
    "Start Date",
    "Deadline",
  ];
  handleReset();

  let answers: string[][] = [];

  const handleSelect = (numb: any) => {
    rating = numb.detail;
    text = "";
  };

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

      const res = await response.json();
      if (!res) {
        alert("Issue adding the project");
      }
      handleReset();
    }
  };

  function handleReset() {
    question_num = 0;
  }
</script>

<div id="wrapper">
  <!-- <h1 on:load={handleReset}>Add Project</h1> -->
  <Tile>
    <h1 on:load={handleReset}>Add Project</h1>
    <header>
      <h2>{questions_new[question_num]}</h2>
      <p>Please write dates in YYYY-MM-DD form</p>
    </header>

    <form>
      <div class="input-group">
        <input type="text" bind:value={text} placeholder="Answer here " />
      </div>
      <br />
      <div class="buttonContainer">
        <Button click={handleSubmit}>Send</Button>
        <Button click={handleReset}>Restart</Button>
      </div>
    </form>
  </Tile>
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    background-color: #FFFFFF;
    padding: 8px 10px;
    border-radius: 8px;
    margin-top: 15px;
  }

  input:focus {
    outline: none;
  }

  .buttonContainer {
		display: flex;
		flex: 0 1;
    gap: 10px;   
  }

  #wrapper {
    margin: 10px 100px;
    padding: 15px;
    border-radius: 10px;
  }
</style>
