<script lang='ts'>
	import '../styles.css';
	import type { PageData } from "./$types";
	import { goto } from '$app/navigation';
	import RiskChart from './charts/RiskChart.svelte';
	import SurveyChart from './charts/SurveyChart.svelte';
	import TaskChart from './charts/TaskChart.svelte';
	import BlankChart from './charts/BlankChart.svelte';
	import BlankChart2 from './charts/BlankChart2.svelte';
	import BlankChart3 from './charts/BlankChart3.svelte';
	export let data: PageData;
</script>

<!-- Import icons -->
<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</svelte:head>

<div id='overviewsBox'>
	<h2>Overview</h2>
	<div class='boxContents'>
		<!-- When clicked, takes user to at risk projects page -->
		<button on:click={() => goto('/projects/atrisk')} class='overviewItem'>
			<span class="material-symbols-outlined" id='riskIcon'>error</span>
			<h3>Projects at risk</h3>
			<!-- Render charts -->
			<div class='donutCell'>
				{#if data.atRisk+data.notAtRisk>0}
					<RiskChart data={data}/>
				{:else}
					<BlankChart/>
				{/if}
				<p class="centerLabel">{data.atRisk}/{data.atRisk+data.notAtRisk}</p>
			</div>
		</button>
		<!-- When clicked, takes user to projects with surveys page -->
		<button on:click={() => goto('/projects/surveysdue')} class='overviewItem'>
			<span class="material-symbols-outlined" id='surveyIcon'>quiz</span>
			<h3>Projects with surveys due</h3>
			<div class='donutCell'>
				<!-- Render charts -->
				{#if data.totalProjects>0}
					<SurveyChart data={data}/>
				{:else}
					<BlankChart2/>
				{/if}
				<p class="centerLabel">{data.withSurveys}/{data.totalProjects}</p>
			</div>
		</button>
		<!-- When clicked, takes user to projects with tasks due page -->
		<button on:click={() => goto('/projects/tasksdue')} class='overviewItem'>
			<span class="material-symbols-outlined" id='taskIcon'>assignment</span>
			<h3>Projects with tasks due</h3>
			<div class='donutCell'>
				<!-- Render charts -->
				{#if data.totalProjects>0}
					<TaskChart data={data}/>
				{:else}
					<BlankChart3/>
				{/if}
				<p class="centerLabel">{data.withTasks}/{data.totalProjects}</p>
			</div>
		</button>
	</div>
</div>

<style>
	#overviewsBox {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: fit-content;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
		box-shadow: var(--outset);
		z-index: 0;
	}

	.overviewItem:hover{
		background-color: var(--fg2);
	}

	.boxContents {
		flex-direction: row;
		flex: 0 1;
	}

	.overviewItem {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		gap: 10px;
		border-radius: 5px;
		background-color: var(--fg3);
		align-items: center;
		justify-content: center;
		box-shadow: var(--outset);
		transition: background-color var(--speed);
	}

	#riskIcon {
		color: #ef4444;
	}

	#surveyIcon {
		color: #3b82f6;
	}

	#taskIcon {
		color: #fde047;
	}

	.donutCell {
		position: relative;
		display: flex;
		justify-content: center;
  		align-items: center;
		text-align: center;
	}

	.centerLabel {
		position: absolute;
		font-size: 18px;
	}
</style>
