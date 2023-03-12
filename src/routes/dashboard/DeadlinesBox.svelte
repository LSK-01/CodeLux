<script lang='ts'>
	import '../styles.css';
	export let deadlineList : any[number][string];
	import { goto } from "$app/navigation";
	const currentDate = new Date();
</script>

<div id='deadlinesBox'>
	<h2>Deadlines</h2>
	<div class='boxContents'>
		{#each deadlineList as entry}
		<button class='deadlineItem' on:click={()=>{goto(`/project_overview?id=${entry.projectID}`)}}>
			{#if entry.deadline < currentDate}
			<span class="material-symbols-outlined bad">pending_actions</span> 
			{:else}
			<span class="material-symbols-outlined">pending_actions</span> 
			{/if}
			<div>
				<h3>{entry.projectName}</h3>
				<p>Due on {(entry.deadline).toLocaleDateString()}</p>
			</div>
		</button>
      	{:else}
		<div class='deadlineItem placeholder'>
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
		transition: background-color var(--speed);
	}

	.placeholder {
		box-shadow: none;
	}

	button:hover {
		background-color: var(--fg2);
	}

	.bad {
        color: #ef4444;
    }

</style>
