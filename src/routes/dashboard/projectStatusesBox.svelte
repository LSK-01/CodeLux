<script>
	import '../styles.css';
</script>

<div id='projectStatusesBox'>
	<h2>Projects</h2>
	<div class='boxContents'>
		<div class='overviewBox' id='projectRiskBox'>
			<span class="material-icons" id='riskIcon'>priority_high</span>
			<h3>Projects at risk</h3>
			<h2>projectsAtRiskCount</h2>
		</div>
		<div class='overviewBox'>
			<span class="material-icons" id='surveyIcon'>assignment</span>
			<h3>Projects with surveys due</h3>
			<h2>projectsAtSurveysCount</h2>
		</div>
		<div class='overviewBox'>
			<span class="material-icons" id='taskIcon'>task</span>
			<h3>Projects with tasks due</h3>
			<h2>projectsAtTaskCount</h2>
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

	#projectRiskBox{
		border: solid 5px rgb(160, 0, 0);
	}

	.overviewBox {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 5px 0;
		border-radius: 5px;
		background-color: var(--fg2);
		border: var(--text);
		align-items: center;
		justify-content: center;
	}

	#riskIcon {
		color: rgb(160, 0, 0);
	}

	#surveyIcon {
		color: rgb(0, 61, 160);
	}

	#taskIcon {
		color: rgb(0, 160, 61);
	}


</style>
