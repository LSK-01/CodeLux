<script lang='ts'>
	import '../styles.css';
	export let deadlineList : any[number][string];
	import { goto } from "$app/navigation";
	// import ProjectBoxSimple from './projectBoxSimple.svelte';
</script>

<div id='deadlinesBox'>
	<h2>Upcoming Deadlines</h2>
	<div class='boxContents'>
		{#each deadlineList as entry}
		<button class='deadlineItem' on:click={()=>{goto(`/project_overview?id=${entry.projectID}`)}}>
			<span class="material-symbols-outlined">pending_actions</span> 
			<div>
				<h3>{entry.projectName}</h3>
				<p>Due date: {entry.dueDate}</p>
			</div>
			<!-- <ProjectBoxSimple name={projectName} date={dueDate}/> -->
		</button>
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
		justify-content: flex-start;
		gap: 10px;
		background-color: var(--fg3);
		padding: 10px;
		border-radius: 5px;
		text-align: left;
		box-shadow: var(--outset);
	}

	button:hover {
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
