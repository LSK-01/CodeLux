<script>
	import './styles.css';
	import { page } from '$app/stores';
	import Header from './Header.svelte';
	import Sidebar from './sidebar/Sidebar.svelte';
	let navItems = ['about', 'login', 'signup', 'dashboard'];
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<div class="app">
	<!--- add if statetment here to change the entire navbar once user is logged in-->
	{#if $page.url.pathname != '/dashboard'}
		<Header navItems={navItems} />
	{:else}
		<Sidebar email={data.post.email}/>
	{/if}

	<main>
		<slot />
	</main>

	<footer>
		<p>Pimp My Project</p>
	</footer>
</div>

