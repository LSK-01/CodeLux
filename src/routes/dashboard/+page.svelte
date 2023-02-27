<script lang="ts">
  import '../styles.css';
  import ProjectStatusesBox from "./OverviewsBox.svelte";
  import ProjectTasksBox from "./TasksBox.svelte";
  import ProjectSurveysBox from "./SurveysBox.svelte";
  import ProjectDeadlinesBox from "./DeadlinesBox.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  	<title>Dashboard</title>
</svelte:head>

<div id="dashboard">
	<ProjectStatusesBox data={data}/>
	<ProjectDeadlinesBox
		deadlineList={data.deadlineList} 
	/>
	<ProjectSurveysBox
		surveyList={data.surveyList} 
	/>
	<ProjectTasksBox
		taskList={data.taskList} 
	/>
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
