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
	let customized = ['dashboard', 'projects', 'add', 'surveys'];

	$: navItems = customized.includes($page.url.pathname.slice(1)) ? customized : landing;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div class="app">
	{#if $page.url.pathname != '/dashboard'}
	<Header navItems={navItems} />
	{:else}
	<Navbar user={user}/>
	{/if} 

	<main>
		<slot/>
	</main>

	<Footer/>
</div>

<style>
	main {
		min-height: 89.2vh;
	}
</style>

