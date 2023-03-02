<script lang='ts'>
	import '../styles.css';
	export let taskList : any[number][string];
</script>

<div id='tasksBox'>
	<h2>Tasks</h2>
	<div class='boxContents'>
		{#each taskList as task}
		<a class='taskItem' href='/forms/{task.projectID}'>
			<h3>{task.projectName}<h3>
			<p>{task.text}<p>
		</a>
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
		background-color:var(--fg3);
		padding: 10px;
		border-radius: 5px;
		box-shadow: var(--outset);
	}

	a:hover {
		background-color: var(--fg2);
	}

	.taskItem p {
		text-indent: 20px;
	}
</style>
