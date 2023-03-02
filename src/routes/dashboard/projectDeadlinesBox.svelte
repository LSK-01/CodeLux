<script lang='ts'>
	import '../styles.css';
	export let deadlineList : any[number][string];
	import ProjectBoxSimple from './projectBoxSimple.svelte';

	const str : string = "Due Date: ";
</script>

<svelte:head>
	<!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />    -->
</svelte:head>

<div id='projectDeadlinesBox'>
	<h2>Upcoming Deadlines</h2>
	<div class='boxContents'>
		{#each deadlineList as { projectName, dueDate } }
			<div class='ProjectBoxWrapper'>
        		<ProjectBoxSimple name={projectName} extraInfo={str.concat(dueDate)} icon={"description"}/>
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
		padding: 15px;
		border-radius: 5px;
		background-color: var(--fg1);
	}

	.ProjectBoxWrapper {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		/* padding: 0px 10px 0px 10px; */
		/* padding: 10px; */
		border-radius: 5px;
	}

	.deadlineBox {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		/* box-shadow: inset 0 0 10px #FFFFFF; */
		/* justify-content: space-evenly; */
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
