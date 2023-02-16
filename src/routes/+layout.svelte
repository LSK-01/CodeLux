<script>
	import './styles.css';
	import Sidebar from './sidebar.svelte';
	import ProjectStatusesBox from './projectStatusesBox.svelte';
	import ProjectTasksBox from './projectTasksBox.svelte';
	import ProjectDeadlinesBox from './projectDeadlinesBox.svelte';
</script>

<div class="app">
	<div id='wrapper'>
		<Sidebar/>
		<div id="dashboard">
			<ProjectStatusesBox/>
			<ProjectTasksBox/>
			<ProjectDeadlinesBox/>
		</div>
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: space-evenly;
		flex: 1;
		padding: 0 10vw;
	}

	#wrapper {
		display: flex;
		flex: 1;
		margin: 10px 0;
		flex-direction: column;
		gap: 10px;
	}

	#dashboard {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 10px;
		flex-wrap: wrap;
	}

	#lowerDashboard {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.boxContents {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 5px 0;
		border-radius: 10px;
		background-color: var(--fg1);
	}

</style>
