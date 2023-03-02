<script lang='ts'>
	import '../styles.css';
	export let surveyList: any[] = [];

	import ProjectBoxSimple from './projectBoxSimple.svelte';

	const str : string = "Survey for ";
</script>

<div id='surveysBox'>
	<h2>Surveys</h2>
	<div class='boxContents'>
		{#each surveyList as survey}
		<div class='ProjectBoxWrapper'>
			<ProjectBoxSimple name={str.concat(survey.projectName)} extraInfo={""} icon={"assignment"}/>
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
		box-shadow: var(--outset);
	}

	a:hover {
		background-color: var(--fg2);
	}
</style>
