<script lang='ts'>
	import '../styles.css';
	export let taskList : any[number][string];
	import { goto } from "$app/navigation";
</script>

<div id='tasksBox'>
	<h2>Tasks</h2>
	<div class='boxContents'>
		{#each taskList as task}
		<button class='taskItem' on:click={()=>{goto(`/project_overview?id=${task.projectID}`)}}>
			<span class="material-symbols-outlined">assignment</span> 
			<div>
				<h3>{task.projectName}<h3>
				<p>{task.text}</p>
			</div>
		</button>
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
</style>
