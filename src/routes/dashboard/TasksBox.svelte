<script lang='ts'>
	import '../styles.css';
	export let taskList : any[number][string];
</script>

<div id='tasksBox'>
	<h2>Tasks</h2>
	<div class='boxContents'>
		{#each taskList as {projectName, text}}
		<div class='taskItem'>
			<h3>{projectName}<h3>
			<p>{text}<p>
		</div>
		{:else}
		<div class='taskItem'>
			<h3>No tasks due<h3>
		</div>
		{/each}
	</div>
</div>

<style>
	#tasksBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
		box-shadow: var(--outset);
	}

	.taskItem {
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
		box-shadow: var(--outset);
	}

	.taskItem p {
		text-indent: 20px;
	}
</style>
