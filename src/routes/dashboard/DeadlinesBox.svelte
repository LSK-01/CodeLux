<script lang='ts'>
	import '../styles.css';
	export let deadlineList: string = "";
</script>

<div id='deadlinesBox'>
	<h2>Upcoming Deadlines</h2>
	<div class='boxContents'>
		{#each JSON.parse(deadlineList) as project}
		<div class='deadlineItem'>
			<h3>{project.name}<h3>
			<p>Due on {project.deadline}<p>
		</div>
		{:else}
		<div class='deadlineItem'>
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
		box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}

	.deadlineItem {
		margin: 5px 0 ;
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}

	.deadlineItem p {
		text-indent: 20px;
	}
</style>
