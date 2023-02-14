<script>
	import './styles.css';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div id="sidebar">
	<span class="material-icons">menu</span>
	<nav>
		<a href="/">User <span class="material-icons">person</span></a>
		<a href="/">Add project <span class="material-icons">add</span></a>
		<a href="/">Surveys <span class="material-icons">assignment</span></a>
		<a href="/">Log out <span class="material-icons">logout</span></a>
	</nav>
</div>

<style>
	#sidebar {
		display: flex;
		width: 10vw;
		height: 100vh;

		border-radius: 0 10px 10px 0;
		background-color:rgba(0, 0, 0, 0.5);;
	}

	nav {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	nav a {
		display: flex;
		justify-content: left;
		align-items: center;
		color: var(--color-text);
		text-decoration: none;
		flex-direction: row;
	}

</style>
