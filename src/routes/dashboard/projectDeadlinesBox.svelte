<script lang='ts'>
	import '../styles.css';
	export let deadlineList: string = "";
</script>

<div id='projectDeadlinesBox'>
	<h2>Upcoming Deadlines</h2>
	<div class='boxContents'>
		{#each JSON.parse(deadlineList) as project}
		<div class='deadlineBox'>
			<h3>{project.name}<h3>
			<p>Due on {project.deadline}<p>
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

	.deadlineBox {
		margin: 5px 0 ;
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
	}

	.deadlineBox p {
		text-indent: 20px;
	}
</style>
