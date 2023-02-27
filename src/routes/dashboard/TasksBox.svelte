<script lang='ts'>
	import '../styles.css';;
	export let taskList: string = "";
</script>

<div id='tasksBox'>
	<h2>Tasks</h2>
	<div class='boxContents'>
		{#each JSON.parse(taskList) as task}
		<div class='taskItem'>
			<h3>task.projectName<h3>
			<p>task.text<p>
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
		/* box-shadow: 0 10px 5px -5px var(--fg2); */
	}

	.taskItem {
		margin: 5px 0 ;
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
	}

	.taskItem p {
		text-indent: 20px;
	}
</style>
