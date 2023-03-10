<script lang="ts">
	import ProjectBox from './projectBox.svelte';

	export let projectData : any[number][string];
	export let title : string;
</script>

<div id='projectListBox'>
    <h2>{title}</h2>
	<div class='boxContents'>
		{#each projectData as { id, projectName, dueDate } }
        	<ProjectBox name={projectName} date={dueDate} id={id} />
		{:else}
			<div class='projectListItem placeholder'>
				No projects found
			</div>
      	{/each}	
	</div>
</div>

<style>
	#projectListBox {
		width: calc(100%);
		height: calc(100%);
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
	}

	.boxContents {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 5px 0;
		border-radius: 5px;
		background-color: var(--fg1);
		gap: 10px;
		padding: 10px;
		justify-content: space-evenly;
	}

	.projectListItem {
		padding: 10px;
		border-radius: 5px;
		background-color: var(--fg3);
	}
	.placeholder {
		box-shadow: none;
	}
</style>
