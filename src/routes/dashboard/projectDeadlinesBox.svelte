<script lang='ts'>
	import '../styles.css';
	export let deadlineList : any[number][string];
	import ProjectBox from '../projects/projectBox.svelte';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />   
</svelte:head>

<div id='projectDeadlinesBox'>
	<h2>Upcoming Deadlines</h2>
	<div class='boxContents'>
		{#each deadlineList as { projectName, dueDate } }
			<div class='ProjectBoxWrapper'>
        		<ProjectBox name={projectName} date={dueDate}/>
			</div>
      	{:else}
		<div class='deadlineBox'>
			<h3>No projects due<h3>
		</div>
		{/each}
	</div>
</div>

<style>
	#projectDeadlinesBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
		/* box-shadow: 0 10px 5px -5px var(--fg2); */
	}

	.boxContents {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 5px 0;
		border-radius: 5px;
		background-color: var(--fg1);
		box-shadow: inset 0 0 10px rgba(0, 0, 0);
	}

	/* .deadlineBox {
		margin: 5px 0 ;
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
	} */

	.ProjectBoxWrapper {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 5px 0;
		border-radius: 5px;
		gap: 10px;
		padding: 10px;
		justify-content: space-evenly;		
	}

	.deadlineBox {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		/* padding: 5px 0;
		border-radius: 5px; */
		background-color: var(--fg1);
		box-shadow: inset 0 0 10px rgba(0, 0, 0);
		/* gap: 10px;
		padding: 10px; */
		justify-content: space-evenly;
	}

	.deadlineBox p {
		text-indent: 20px;
	}

	.material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
    }
</style>
