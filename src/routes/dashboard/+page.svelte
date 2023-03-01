<script lang="ts">
  import '../styles.css';
  import OverviewsBox from "./OverviewsBox.svelte";
  import TasksBox from "./TasksBox.svelte";
  import SurveysBox from "./SurveysBox.svelte";
  import DeadlinesBox from "./DeadlinesBox.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  	<title>Dashboard</title>
</svelte:head>

<div id="dashboard">
	<OverviewsBox data={data} />
	<DeadlinesBox deadlineList={data.deadlineList} />
	<SurveysBox surveyList={data.surveyList} />
	<TasksBox taskList={data.taskList} />
</div>

<style>
	#dashboard {
		display: flex;
		min-height: 100vh;
		justify-content: space-evenly;
		flex: 1;
		margin: 10px 10vw;
		gap: 10px;
		flex-wrap: wrap;
	}
</style>
