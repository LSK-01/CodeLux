<script lang='ts'>
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import type { PageData } from "./$types";
    import { page } from '$app/stores';
	export let data: PageData;
	let user = data.user;
	let landing = ['', 'about', 'login', 'signup'];
	let loggedIn = ['dashboard', 'projects', 'add', 'logout'];
	$: navItems = landing.includes($page.url.pathname.slice(1)) ? landing : loggedIn;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div class="app">
	<Header navItems={navItems} user={user}/>

	<main>
		<slot/>
	</main>

	<Footer navItems={navItems}/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	@media screen and (max-width: 880px) {
		main {
			margin-bottom: 65px;
		}
	}
</style>

