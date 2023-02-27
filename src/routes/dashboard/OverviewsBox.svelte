<script lang='ts'>
	import '../styles.css';
	import type { PageData } from "./$types";
	export let data: PageData;
	let atRisk: number = data.atRisk;
	let notAtRisk: number = data.notAtRisk;
	let withSurveys: number = data.withSurveys;
	let withoutSurveys: number = data.withoutSurveys;
	let withTasks: number = data.withTasks;
	let withoutTasks: number = data.withoutTasks;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript">
		google.charts.load("current", {packages:["corechart"]});
		google.charts.setOnLoadCallback(drawRiskChart);
		function drawRiskChart() {
			var notAtRisk = Number(document.getElementById("riskDonutChart").getAttribute('data-notatrisk'));
			var atRisk = Number(document.getElementById("riskDonutChart").getAttribute('data-atrisk'));
			var riskData = google.visualization.arrayToDataTable([
				['Risk', 'Count'],
				['Not at risk', notAtRisk],
				['At risk', atRisk]
			]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['rgb(0, 160, 0)', 'rgb(160, 0, 0)'],
				legend: {position: 'none'},
				chartArea: {
					height: '90%',
					width: '90%',
				},
			};

		var chart = new google.visualization.PieChart(document.getElementById('riskDonutChart'));
		chart.draw(riskData, options);
		}

		google.charts.setOnLoadCallback(drawSurveyChart);
		function drawSurveyChart() {
			var withSurveys = Number(document.getElementById("surveyDonutChart").getAttribute('data-withsurveys'));
			var withoutSurveys = Number(document.getElementById("surveyDonutChart").getAttribute('data-withoutsurveys'));
			var surveyData = google.visualization.arrayToDataTable([
				['Surveys', 'Count'],
				['Without surveys', withoutSurveys],
				['With surveys', withSurveys]
			]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['rgb(0, 160, 0)', 'rgb(0, 60, 160)'],
				legend: {position: 'none'},
				chartArea: {
					height: '90%',
					width: '90%',
				},
			};

			var chart = new google.visualization.PieChart(document.getElementById('surveyDonutChart'));
			chart.draw(surveyData, options);
		}

		google.charts.setOnLoadCallback(drawTaskChart);
			function drawTaskChart() {
			var withTasks = Number(document.getElementById("taskDonutChart").getAttribute('data-withtasks'));
			var withoutTasks = Number(document.getElementById("taskDonutChart").getAttribute('data-withouttasks'));
			var taskData = google.visualization.arrayToDataTable([
				['Tasks', 'Count'],
				['without tasks', withoutTasks],
				['With tasks', withTasks]
			]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['rgb(0, 160, 0)', 'rgb(160, 160, 0)'],
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
		<div class='overviewItem'>
			<span class="material-icons" id='riskIcon'>priority_high</span>
			<h3>Projects at risk</h3>
			<h2>{atRisk}</h2>
			<div class="donutChart" id="riskDonutChart" data-notatrisk={notAtRisk} data-atrisk={atRisk} ></div>
		</div>
		<div class='overviewItem'>
			<span class="material-icons" id='surveyIcon'>assignment</span>
			<h3>Projects with surveys due</h3>
			<h2>{withSurveys}</h2>
			<div class="donutChart" id="surveyDonutChart" data-withoutsurveys={withoutSurveys} data-withsurveys={withSurveys}></div>
		</div>
		<div class='overviewItem'>
			<span class="material-icons" id='taskIcon'>task</span>
			<h3>Projects with tasks due</h3>
			<h2>{withTasks}</h2>
			<div class="donutChart" id="taskDonutChart" data-withouttasks={withoutTasks} data-withtasks={withTasks}></div>
		</div>
	</div>
</div>

<style>
	#overviewsBox {
		width: calc(100%);
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color:rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	#overviewsBox .boxContents {
		flex-direction: row;
		gap: 10px;
		padding: 10px;
	}

	.overviewItem {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		border-radius: 5px;
		background-color: var(--fg2);
		align-items: center;
		justify-content: center;
	}

	#riskIcon {
		color: rgb(160, 0, 0);
	}

	#surveyIcon {
		color: rgb(0, 60, 160);
	}

	#taskIcon {
		color: rgb(160, 160, 0);
	}

	.donutChart{
		width: 200px; 
		height: 200px;
	}
</style>
