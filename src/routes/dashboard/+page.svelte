<script lang='ts'>
	import '../styles.css';
	import ProjectStatusesBox from './projectStatuses/projectStatusesBox.svelte';
	import ProjectTasksBox from './projectTasksBox.svelte';
	import ProjectDeadlinesBox from './projectDeadlinesBox.svelte';
</script>

<svelte:head>
  	<title>Dashboard</title>
</svelte:head>

<div id='wrapper'>
	<div id="dashboard">
		<ProjectStatusesBox/>
		<ProjectTasksBox/>
		<ProjectDeadlinesBox/>
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
