<script>
	import '../styles.css';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      	google.charts.load("current", {packages:["corechart"]});
      	google.charts.setOnLoadCallback(drawRiskChart);
      	function drawRiskChart() {
        	var data = google.visualization.arrayToDataTable([
				['Risk', 'Count'],
				['Not at risk', 10],
				['At risk', 2]
        	]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['rgb(0, 160, 0)', 'rgb(160, 0, 0)'],
				legend: {position: 'none'},
				enableInteractivity: false,
				chartArea: {
					height: '100%',
					width: '100%',
				},
			};

			var chart = new google.visualization.PieChart(document.getElementById('riskDonutChart'));
			chart.draw(data, options);
      	}

		google.charts.setOnLoadCallback(drawSurveyChart);
      	function drawSurveyChart() {
        	var data = google.visualization.arrayToDataTable([
				['Surveys', 'Count'],
				['With no surveys', 11],
				['With surveys', 1]
        	]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['rgb(0, 160, 0)', 'rgb(0, 60, 160)'],
				legend: {position: 'none'},
				enableInteractivity: false,
				chartArea: {
					height: '100%',
					width: '100%',
				},
			};

			var chart = new google.visualization.PieChart(document.getElementById('surveyDonutChart'));
			chart.draw(data, options);
      	}

		google.charts.setOnLoadCallback(drawTaskChart);
      	function drawTaskChart() {
        	var data = google.visualization.arrayToDataTable([
				['Tasks', 'Count'],
				['with no tasks', 7],
				['With tasks', 5]
        	]);

			var options = {
				pieHole: 0.8,
				backgroundColor: 'none',
				pieSliceText: 'none',
				colors: ['rgb(0, 160, 0)', 'rgb(160, 160, 0)'],
				legend: {position: 'none'},
				enableInteractivity: false,
				chartArea: {
					height: '100%',
					width: '100%',
				},
			};

			var chart = new google.visualization.PieChart(document.getElementById('taskDonutChart'));
			chart.draw(data, options);
      	}
    </script>
</svelte:head>

<div id='projectStatusesBox'>
	<h2>Projects</h2>
	<div class='boxContents'>
		<div class='overviewBox' id='projectRiskBox'>
			<span class="material-icons" id='riskIcon'>priority_high</span>
			<h3>Projects at risk</h3>
			<h2>projectsWithRiskCount</h2>
			<div class="donutChart" id="riskDonutChart"></div>
		</div>
		<div class='overviewBox'>
			<span class="material-icons" id='surveyIcon'>assignment</span>
			<h3>Projects with surveys due</h3>
			<h2>projectsWithSurveysCount</h2>
			<div class="donutChart"id="surveyDonutChart"></div>
		</div>
		<div class='overviewBox'>
			<span class="material-icons" id='taskIcon'>task</span>
			<h3>Projects with tasks due</h3>
			<h2>projectsAtTaskCount</h2>
			<div class="donutChart" id="taskDonutChart"></div>
		</div>
	</div>
</div>

<style>
	#projectStatusesBox {
		width: calc(100%);
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color:rgba(0, 0, 0, 0.5);
		border-radius: 10px;
		/* box-shadow: 0 10px 5px -5px var(--fg2); */
	}

	.boxContents {
		flex: 1 0;
		display: flex;
		flex-direction: row;
		padding: 5px 0;
		border-radius: 5px;
		background-color: var(--fg1);
		box-shadow: inset 0 0 10px rgba(0, 0, 0);
		gap: 10px;
		padding: 10px;
		justify-content: space-evenly;
	}

	.overviewBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		border-radius: 5px;
		background-color: var(--fg2);
		align-items: center;
		justify-content: center;
	}

	#projectRiskBox{
		border: solid 5px rgb(160, 0, 0);
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
