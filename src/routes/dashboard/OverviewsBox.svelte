<script lang='ts'>
	import '../styles.css';
	import type { PageData } from "./$types";
	import { goto } from '$app/navigation';
	export let data: PageData;
	let atRisk: number = data.atRisk;
	let notAtRisk: number = data.notAtRisk;
	let withSurveys: number = data.withSurveys;
	let withoutSurveys: number = data.withoutSurveys;
	let withTasks: number = data.withTasks;
	let withoutTasks: number = data.withoutTasks;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
	<!-- https://sharepoint.stackexchange.com/questions/38445/google-charts-disappear-on-refresh-f5-of-a-browser -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript">
		google.charts.load("current", {packages:["corechart"]});
		google.charts.setOnLoadCallback(setTimeout(drawRiskChart, 250));
		function drawRiskChart() {
			var notAtRisk = Number(document.getElementById("riskDonutChart").getAttribute('data-notatrisk'));
			var atRisk = Number(document.getElementById("riskDonutChart").getAttribute('data-atrisk'));
			if (atRisk==0) {
				notAtRisk = Math.max(notAtRisk, 1);
			}
			var riskData = google.visualization.arrayToDataTable([
				['Risk', 'Count'],
				['Not at risk', notAtRisk],
				['At risk', atRisk]
			]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['#22c55e', '#ef4444'],
				legend: {position: 'none'},
				chartArea: {
					height: '90%',
					width: '90%',
				}
			};
			var chart = new google.visualization.PieChart(document.getElementById('riskDonutChart'));
			chart.draw(riskData, options);
		}

		google.charts.setOnLoadCallback(setTimeout(drawSurveyChart, 250));
		function drawSurveyChart() {
			var withSurveys = Number(document.getElementById("surveyDonutChart").getAttribute('data-withsurveys'));
			var withoutSurveys = Number(document.getElementById("surveyDonutChart").getAttribute('data-withoutsurveys'));
			if (withSurveys==0) {
				withoutSurveys = Math.max(withoutSurveys, 1);
			}
			var surveyData = google.visualization.arrayToDataTable([
				['Surveys', 'Count'],
				['Without surveys', withoutSurveys],
				['With surveys', withSurveys]
			]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['#22c55e', '#3b82f6'],
				legend: {position: 'none'},
				chartArea: {
					height: '90%',
					width: '90%',
				},
			};
			
			var chart = new google.visualization.PieChart(document.getElementById('surveyDonutChart'))
			chart.draw(surveyData, options)
		}
		google.charts.setOnLoadCallback(setTimeout(drawTaskChart, 250));
		function drawTaskChart() {
			var withTasks = Number(document.getElementById("taskDonutChart").getAttribute('data-withtasks'));
			var withoutTasks = Number(document.getElementById("taskDonutChart").getAttribute('data-withouttasks'));
			if (withTasks==0) {
				withoutTasks = Math.max(withoutTasks, 1);
			}
			var taskData = google.visualization.arrayToDataTable([
				['Tasks', 'Count'],
				['without tasks', withoutTasks],
				['With tasks', withTasks]
			]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['#22c55e', '#fde047'],
				legend: {position: 'none'},
				chartArea: {
					height: '90%',
					width: '90%',
				},
			};

			var chart = new google.visualization.PieChart(document.getElementById('taskDonutChart'));
			chart.draw(taskData, options);
		}
	</script>
</svelte:head>

<div id='overviewsBox'>
	<h2>Overview</h2>
	<div class='boxContents'>
		<button on:click={() => goto('/projects/atrisk')} class='overviewItem'>
			<span class="material-symbols-outlined" id='riskIcon'>error</span>
			<h3>Projects at risk</h3>
			<div class='donutCell'>
				<div class="donutDiv" id="riskDonutChart" data-notatrisk={notAtRisk} data-atrisk={atRisk} ></div>
				<p class="centerLabel">{atRisk}/{atRisk+notAtRisk}</p>
			</div>
		</button>
		<button on:click={() => goto('/projects/surveysdue')} class='overviewItem'>
			<span class="material-symbols-outlined" id='surveyIcon'>quiz</span>
			<h3>Projects with surveys due</h3>
			<div class='donutCell'>
				<div class="donutDiv" id="surveyDonutChart" data-withoutsurveys={withoutSurveys} data-withsurveys={withSurveys}></div>
				<p class="centerLabel">{withSurveys}/{withSurveys+withoutSurveys}</p>
			</div>
		</button>
		<button class='overviewItem'>
			<span class="material-symbols-outlined" id='taskIcon'>assignment</span>
			<h3>Projects with tasks due</h3>
			<div class='donutCell'>
					<div class="donutDiv" id="taskDonutChart" data-withouttasks={withoutTasks} data-withtasks={withTasks}></div>
					<p class="centerLabel">{withTasks}/{withTasks+withoutTasks}</p>
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
		border-radius: 5px;
		background-color: var(--fg3);
		align-items: center;
		justify-content: center;
		box-shadow: var(--outset);
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

	.donutDiv {
		width: 100px;
		height: 100px;
	}

	.centerLabel {
		position: absolute;
		font-size: 18px;
	}
</style>
