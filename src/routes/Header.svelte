<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import type { user } from '../user';
	import Button from './Button.svelte';
	export let navItems: string[];
	export let user: user;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</svelte:head>

<nav>
	<h1>Pimp My Project</h1>
	{#if !navItems.includes("login")}
		<div id="userBox">
			<span class="material-symbols-outlined">account_circle</span>
			<h2>{user.username}</h2>
		</div>
	{/if}
	{#each navItems as item}
		{#if item=="projects" && $page.url.pathname!="/projects/all"}
		<Button click={() => goto('/projects/all')}><span class="material-symbols-outlined">format_list_bulleted</span>View all projects</Button>
		{:else if item=="add" && $page.url.pathname!="/add"}
		<Button click={() => goto('/add')}><span class="material-symbols-outlined">add_circle</span>Add project</Button>
		{:else if item=="login" && $page.url.pathname!="/login"}
		<Button click={() => goto('/login')}><span class="material-symbols-outlined">login</span>Log in</Button>
		{:else if item=="signup" && $page.url.pathname!="/signup"}
		<Button click={() => goto('/signup')}><span class="material-symbols-outlined">person_add</span>Sign up</Button>
		{:else if item=="dashboard" && $page.url.pathname!="/dashboard"}
		<Button click={() => goto('/dashboard')}><span class="material-symbols-outlined">dashboard</span>View dashboard</Button>
		{:else if item=="logout"}
		<Button click={() => goto('/login')}><span class="material-symbols-outlined">logout</span>Log out</Button> 
		{/if}
		<!-- <a href="/{item.toLowerCase()}" class="hover:text-red-400 {$page.url.pathname == "/" + item.toLowerCase() ? "text-red-300": ""}">{item.toUpperCase()}</a> -->
	{/each}
</nav>


<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 0 0 10px 10px;
		background-color: var(--fg1);
		padding: 10px 10vw;
		gap: 10px;
	}

	nav h1 {
		flex: 1;
		text-align: left;
	}

	#userBox {
		display: flex;
		border-radius: 10px;
		background-color: var(--fg1);
		gap: 10px;
		padding: 10px;
	}

	#userBox h2 {
		margin: 0;
	}
</style>
