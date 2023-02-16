<script>
	import '../styles.css';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<nav id="sidebar">
	<!-- <span class="material-icons">menu</span> -->
	<h2>Hello, x!</h2>
	<a href="/">User <span class="material-icons">person</span></a>
	<a href="/">Add project <span class="material-icons">add</span></a>
	<a href="/">Surveys <span class="material-icons">assignment</span></a>
	<a href="/">Log out <span class="material-icons">logout</span></a>
</nav>

<style>
	#sidebar {
		display: flex;
		flex: 0 1;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: row;
		border-radius: 10px;
		background-color:rgba(0, 0, 0, 0.5);;
	}

	nav a {
		color: var(--color-text);
		text-decoration: none;
		flex-direction: row;
	}

</style>
