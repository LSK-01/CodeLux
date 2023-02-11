<script>
	import './styles.css';
	import Sidebar from './sidebar.svelte';
	import ProjectStatusesBox from './projectStatusesBox.svelte';
	import ProjectTasksBox from './projectTasksBox.svelte';
	import ProjectDeadlinesBox from './projectDeadlinesBox.svelte';
</script>

<div class="app">
	<!-- <Header> -->
	<Sidebar/>
	<div id="dashboard">
		<h1>Hello, x!</h1>
		<ProjectStatusesBox/>
		<div id="lowerDashboard">
			<ProjectTasksBox/>
			<ProjectDeadlinesBox/>
	</div>
</div>

	<!-- <Footer> -->
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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

	/* footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	} */

	/* @media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>
