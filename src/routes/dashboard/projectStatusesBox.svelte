<script>
	import '../styles.css';
</script>

<div id='projectStatusesBox'>
	<h2>Projects</h2>
	<div class='boxContents'>
		<div class='overviewBox'>
			<p>Projects at risk</p>
			<h2>projectsAtRiskCount</h2>
		</div>
		<div class='overviewBox'>
			<p>Projects with surveys due</p>
			<h2>projectsAtSurveysCount</h2>
		</div>
		<div class='overviewBox'>
			<p>Projects at tasks due</p>
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

</style>
