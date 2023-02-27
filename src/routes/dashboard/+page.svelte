<script lang="ts">
  import '../styles.css';
  import Sidebar from '../sidebar/Sidebar.svelte';
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

<div id='wrapper'>
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
</div>

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: space-evenly;
		padding: 0 10vw;
		flex: 1;
		margin: 10px 0;
		gap: 10px;
	}

	#dashboard {
		flex: 1;
		display: flex;
		justify-content: space-evenly;
		gap: 10px;
		flex-wrap: wrap;
	}
</style>
