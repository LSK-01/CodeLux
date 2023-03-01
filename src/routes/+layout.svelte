<script lang='ts'>
	import './styles.css';
	import { page } from '$app/stores';
	import Header from './Header.svelte';
	import Sidebar from './sidebar/Sidebar.svelte';
	import type { PageData } from "./$types";
	export let data: PageData;
	let user = data.user;
	let landing = ['about', 'login', 'signup'];
	let customized = ['dashboard', 'projects', 'add', 'forms'];

	$: navItems = customized.includes($page.url.pathname.slice(1)) ? customized : landing;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div class="app">
	{#if $page.url.pathname != '/dashboard'}
	<Header navItems={navItems} />
	{:else}
	<Sidebar user={user}/>
	{/if} 

	<main>
		<slot />
	</main>

	<footer>
		<p>Pimp My Project</p>
	</footer>
</div>

