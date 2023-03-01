<script lang='ts'>
	import '../styles.css';
	export let surveyList: string[] = [];
</script>

<div id='surveysBox'>
	<h2>Surveys</h2>
	<div class='boxContents'>
		{#each surveyList as projectName}
		<div class='surveyItem'>
			<h3>{projectName}<h3>
		</div>
		{:else}
		<div class='surveyItem'>
			<h3>No surveys due<h3>
		</div>
		{/each}
	</div>
</div>

<style>
	#surveysBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
		box-shadow: var(--outset);
	}

	.surveyItem {
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
		box-shadow: var(--outset);
	}
</style>
