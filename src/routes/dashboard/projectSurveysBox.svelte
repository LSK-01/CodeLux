<script lang='ts'>
	import '../styles.css';
	export let surveyList: any[] = [];

	import ProjectBoxSimple from './projectBoxSimple.svelte';

	const str : string = "Survey for ";
</script>

<div id='projectSurveysBox'>
	<h2>Surveys</h2>
	<div class='boxContents'>
		{#each surveyList as survey}
		<div class='ProjectBoxWrapper'>
			<ProjectBoxSimple name={str.concat(survey.projectName)} extraInfo={""} icon={"assignment"}/>
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

	.ProjectBoxWrapper {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		/* padding: 0px 10px 0px 10px; */
		/* padding: 10px; */
		border-radius: 5px;
	}

	.boxContents {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 15px;
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
