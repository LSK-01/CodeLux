<script lang='ts'>
	import '../styles.css';
	import Button from '../Button.svelte';
	import type { user } from '../../user';
	export let user: user;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<nav>
	<h1>Pimp My Project</h1>
	<Button>
		<a href="/">
			<span class="material-icons" id='userIcon'>account_circle</span>
			<h2>{user.username}</h2>
		</a>
	</Button>
	<Button><a href="/add"><span class="material-icons">add</span>Add project</a></Button>
	<Button><a href="/settings"><span class="material-icons">settings</span>Settings</a></Button>
	<Button><a href="/about"><span class="material-icons">info</span>About</a></Button>
	<Button><a href="/login"><span class="material-icons">logout</span>Log out</a></Button>
</nav>

<style>
	nav {
		display: flex;
		flex: 0 1;
		justify-content: space-between;
		align-items: center;
		border-radius: 0 0 10px 10px;
		background-color: var(--fg1);
		padding: 10px 10vw;
	}

	#userIcon {
		font-size: 50px;
	}

	nav a {
		color: var(--text);
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 5px;
	}
</style>
