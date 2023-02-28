<script lang='ts'>
	import '../styles.css';
	export let surveyList: string[] = [];
</script>

<div id='projectSurveysBox'>
	<h2>Surveys</h2>
	<div class='boxContents'>
		{#each surveyList as survey}
		<div class='surveyBox'>
			<h3>survey.projectName<h3>
		</div>
		{:else}
		<div class='surveyBox'>
			<h3>No surveys due<h3>
		</div>
		{/each}
	</div>
</div>

<style>
	#projectSurveysBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
	}

	.boxContents {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 10px;
		border-radius: 5px;
		background-color: var(--fg1);
	}

	.surveyBox {
		margin: 5px 0 ;
		background-color:var(--fg3);
		padding: 10px;
		border-radius: 5px;
	}
</style>
