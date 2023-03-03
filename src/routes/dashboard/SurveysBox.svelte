<script lang='ts'>
	import '../styles.css';
	export let surveyList: any[number][string];
</script>

<div id='surveysBox'>
	<h2>Surveys</h2>
	<div class='boxContents'>
		{#each surveyList as survey} 
		<a class='surveyItem' href='/forms/{survey.projectID}'>
			<span class="material-symbols-outlined">
				quiz
			</span>  
			<h3>Take survey for {survey.projectName}<h3>
		</a>
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
		display: flex;
		flex-direction: row;
		gap: 10px;
		background-color:var(--fg3);
		padding: 10px;
		border-radius: 5px;
		box-shadow: var(--outset);
	}

	a:hover {
		background-color: var(--fg2);
	}
</style>
