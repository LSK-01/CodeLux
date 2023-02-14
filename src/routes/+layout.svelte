<script>
	import './styles.css';
	import Sidebar from './sidebar.svelte';
	import ProjectStatusesBox from './projectStatusesBox.svelte';
	import ProjectTasksBox from './projectTasksBox.svelte';
	import ProjectDeadlinesBox from './projectDeadlinesBox.svelte';
</script>

<div class="app">
	<div class='wrapper'>
		<Sidebar/>
		<div id="dashboard">
			<h2>Hello, x!</h2>
			<ProjectStatusesBox/>
			<div id="lowerDashboard">
				<ProjectTasksBox/>
				<ProjectDeadlinesBox/>
			</div>
		</div>
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		flex: 1;
		padding: 0 10vw;
	}

	#dashboard {
		flex: 1;
		display: flex;
		flex-direction: column;
  		justify-content: center;
	}

	#lowerDashboard {
		flex: 1;
		display: flex;
		flex-direction: row;
	}
</style>
