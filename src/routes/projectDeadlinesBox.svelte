<script>
	import './styles.css';
</script>

<div id='projectDeadlinesBox'>
	<h2>Upcoming Deadlines</h2>
	<div class='boxContents'>
		<div class='deadlineBox'>
			<h3>projectName<h3>
			<p>Due in timeRemaining<p>
		</div>
		<div class='deadlineBox'>
			<h3>projectName<h3>
			<p>Due in timeRemaining<p>
		</div>
	</div>
</div>

<style>
	#projectDeadlinesBox {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		background-color: var(--fg1);
		border-radius: 10px;
		/* box-shadow: 0 10px 5px -5px var(--fg2); */
	}

	.boxContents {
		flex: 1 0;
		display: flex;
		flex-direction: column;
		padding: 5px 0;
		border-radius: 5px;
		background-color: var(--fg1);
		box-shadow: inset 0 0 10px rgba(0, 0, 0);
	}

	.deadlineBox {
		margin: 5px 0 ;
		background-color:var(--fg2);
		padding: 10px;
		border-radius: 5px;
	}

	.deadlineBox p {
		text-indent: 20px;
	}
</style>
