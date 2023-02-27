<script lang="ts">
  import '../styles.css';
  import Sidebar from '../sidebar/Sidebar.svelte';
  import ProjectStatusesBox from "./projectStatusesBox.svelte";
  import ProjectTasksBox from "./projectTasksBox.svelte";
  import ProjectSurveysBox from "./projectSurveysBox.svelte";
  import ProjectDeadlinesBox from "./projectDeadlinesBox.svelte";
  import type { PageData } from "./$types";
  import type { user } from '../../user';

  export let data: PageData;
  let user = data.user;
</script>

<svelte:head>
  	<title>Dashboard</title>
</svelte:head>

<div id='wrapper'>
	<div id="dashboard">
		<ProjectStatusesBox 
			atRisk={data.post.atRisk} 
			notAtRisk={data.post.notAtRisk}
			withSurveys={data.post.withSurveys} 
			withoutSurveys={data.post.withoutSurveys}
			withTasks={data.post.withTasks} 
			withoutTasks={data.post.withoutTasks}
		/>
		<ProjectDeadlinesBox
			deadlineList={data.post.deadlineList} 
		/>
		<ProjectSurveysBox
			surveyList={data.post.surveyList} 
		/>
		<ProjectTasksBox
			taskList={data.post.taskList} 
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
