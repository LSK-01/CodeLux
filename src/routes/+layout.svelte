<script>
	import './styles.css';
	import { page } from '$app/stores';
	import Header from './Header.svelte';
	let navItems = ['about', 'login', 'signup', 'dashboard'];
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
