<script lang='ts'>
	import '../styles.css';
	export let surveyList: string[] = [];
</script>

<div id='surveysBox'>
	<h2>Surveys</h2>
	<div class='boxContents'>
		{#each surveyList as survey}
		<div class='surveyItem'>
			<h3>survey.projectName<h3>
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
		box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}

	.surveyItem {
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}
</style>
