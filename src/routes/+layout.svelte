<script lang='ts'>
	import './styles.css';
	import { page } from '$app/stores';
	import Header from './Header.svelte';
	import Navbar from './navbar/Navbar.svelte';
	import Footer from './Footer.svelte';
	import type { PageData } from "./$types";
	export let data: PageData;
	let user = data.user;
	let landing = ['about', 'login', 'signup'];
	let loggedIn = ['dashboard', 'projects', 'add', 'logout'];

	$: navItems = user == null ? landing : loggedIn ;
	// $: navItems = loggedIn.includes($page.url.pathname.slice(1)) ? loggedIn : landing;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div class="app">
	<Header navItems={navItems} user={user}/>

	<main>
		<slot/>
	</main>

	<Footer/>
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
</style>

