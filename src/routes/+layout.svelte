<script>
	import './styles.css';
	import { page } from '$app/stores';
	import Header from './Header.svelte';
	let landing = ['about', 'login', 'signup'];
	let customized = ['dashboard', 'projects'];

	$: navItems = customized.includes($page.url.pathname.slice(1)) ? customized : landing;
</script>

<div class="app">
	<!--- add if statetment here to change the entire navbar once user is logged in-->
	<Header navItems={navItems} />

	<main>
		<slot />
	</main>

	<footer>
		<p>Pimp My Project</p>
	</footer>
</div>
