<script>
	import '../styles.css';
	import Button from '../Button.svelte';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<nav>
	<h2>Hello, x!</h2>
	<Button><a href="/">Add project<span class="material-icons">add</span></a></Button>
	<Button><a href="/">Surveys<span class="material-icons">assignment</span></a></Button>
	<Button><a href="/settings">Settings<span class="material-icons">settings</span></a></Button>
	<Button><a href="/about">About<span class="material-icons">info</span></a></Button>
	<Button><a href="/home">Log out<span class="material-icons">logout</span></a></Button>
</nav>

<style>
	nav {
		display: flex;
		flex: 0 1;
		justify-content: space-evenly;
		align-items: center;
		border-radius: 10px;
		background-color:rgba(0, 0, 0, 0.5);;
	}

	nav a {
		color: var(--color-text);
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 5px;
	}
</style>
