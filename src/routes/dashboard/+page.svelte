<script lang="ts">
  import "../styles.css";
  import OverviewsBox from "./overviews/OverviewsBox.svelte";
  import TasksBox from "./TasksBox.svelte";
  import SurveysBox from "./SurveysBox.svelte";
  import DeadlinesBox from "./DeadlinesBox.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  import Button from "../Button.svelte";

  const getNumCommits = async () => {
	const response = await fetch('/getNumCommits', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        });
  };
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div id="dashboard">
  <OverviewsBox {data} />
  <div>
    <DeadlinesBox deadlineList={data.deadlineList} />
    <SurveysBox surveyList={data.surveyList} />
    <TasksBox taskList={data.taskList} />
  </div>
  <Button click={getNumCommits}>get num comimts</Button>
</div>

<style>
  #dashboard {
    display: flex;
    min-height: 100vh;
    justify-content: space-evenly;
    margin: 10px 10vw;
    gap: 10px;
    flex-wrap: wrap;
  }

  #dashboard div {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    gap: 10px;
    height: 70vh;
  }
</style>
