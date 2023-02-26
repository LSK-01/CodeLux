<script lang='ts'>
	import '../styles.css';;
	export let taskList: string = "";
</script>

<div id='projectTasksBox'>
	<h2>Tasks</h2>
	<div class='boxContents'>
		{#each JSON.parse(taskList) as task}
		<div class='taskBox'>
			<h3>task.projectName<h3>
			<p>task.text<p>
		</div>
		{:else}
		<div class='taskBox'>
			<h3>No tasks due<h3>
		</div>
		{/each}
	</div>
</div>

<style>
	#projectTasksBox {
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

	.taskBox {
		margin: 5px 0 ;
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
	}

	.taskBox p {
		text-indent: 20px;
	}
</style>
