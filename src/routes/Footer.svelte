<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import Button from './Button.svelte';
	export let navItems: string[];
	console.log(navItems);
</script>

<footer>
    <h3>CodeLux</h3>
	<div id='btns'>
	{#each navItems as item}
		{#if item=="projects" && $page.url.pathname!="/projects/all"}
			<Button click={() => goto('/projects/all')}><span class="material-symbols-outlined">format_list_bulleted</span></Button>
		{:else if item=="add" && $page.url.pathname!="/add"}
			<Button click={() => goto('/add')}><span class="material-symbols-outlined">add_circle</span></Button>
		{:else if item=="login" && $page.url.pathname!="/login"}
			<Button click={() => goto('/login')}><span class="material-symbols-outlined">login</span></Button>
		{:else if item=="signup" && $page.url.pathname!="/signup"}
			<Button click={() => goto('/signup')}><span class="material-symbols-outlined">person_add</span></Button>
		{:else if item=="dashboard" && $page.url.pathname!="/dashboard"}
			<Button click={() => goto('/dashboard')}><span class="material-symbols-outlined">dashboard</span></Button>
		{:else if item=="logout"}
			<Button click={() => goto('/login')}><span class="material-symbols-outlined">logout</span></Button> 
		{/if}
	<!-- <a href="/{item.toLowerCase()}" class="hover:text-red-400 {$page.url.pathname == "/" + item.toLowerCase() ? "text-red-300": ""}">{item.toUpperCase()}</a> -->
	{/each}
	</div>
</footer>

<style>
    footer {
		display: flex;
		align-items: center;
		border-radius: 10px 10px 0 0;
		background-color: var(--fg1);
		padding: 10px 10vw;
		gap: 10px;
    }

	#btns {
		display: none;
		justify-content: space-evenly;
		width: 100%;
		gap: 10px;
	}

	@media screen and (max-width: 880px) {
		#btns {
			display: flex;
		}

		h3 {
			display: none;
		}

		footer {
			position: fixed;
			overflow: hidden;
			width: 100vw;
			bottom: 0;
		}
	}
</style>