<script lang='ts'>
	import '../styles.css';
	export let deadlineList : any[number][string];
	// import ProjectBoxSimple from './projectBoxSimple.svelte';
</script>

<div id='deadlinesBox'>
	<h2>Upcoming Deadlines</h2>
	<div class='boxContents'>
		{#each deadlineList as entry}
		<a class='deadlineItem' href='/project_overview/{entry.projectID}'>
			<span class="material-symbols-outlined">description</span> 
			<div>
				<h3>{entry.projectName}</h3>
				Due date: {entry.dueDate}
			</div>
			<!-- <ProjectBoxSimple name={projectName} date={dueDate}/> -->
		</a>
      	{:else}
		<div class='deadlineItem'>
			<h3>No projects due<h3>
		</div>
		{/each}
	</div>
</div>

<style>
	#deadlinesBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
		box-shadow: var(--outset);
	}

	.deadlineItem {
		display: flex;
		align-items: center;
		gap: 10px;
		background-color: var(--fg3);
		padding: 10px;
		border-radius: 5px;
		box-shadow: var(--outset);
	}

	a:hover {
		background-color: var(--fg2);
	}
	
	/* .ProjectBoxWrapper {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 0px 10px 0px 10px; 
		padding: 10px; 
		border-radius: 5px;
	} */
</style>
