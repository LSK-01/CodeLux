<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	export let navItems: string[];
</script>

<header>
	<div class=" flex flex-row gap-5 pt-5 pl-5">
		{#each navItems as item}
			<a href="/{item.toLowerCase()}" class="hover:text-red-400 {$page.url.pathname == "/" + item.toLowerCase() ? "text-red-300": ""}">{item.toUpperCase()}</a>
		{/each}
	</div>
</header>
