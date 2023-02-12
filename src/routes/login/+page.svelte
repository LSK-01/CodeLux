<script lang="ts">
	import Input from '../Input.svelte';
	import Button from '../Button.svelte';
	import type { PageData, ActionData } from './$types';
	import {goto} from '$app/navigation';

</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class=" self-center pt-10 pb-48">
	<h1 class=" text-7xl">Pimp my Project</h1>
</div>

<form method="POST">
	<section class="flex flex-col justify-center items-center flex-1 gap-5">
		<Input type="text" name="email" placeholder="Email" />
		<Input type="password" name="password" placeholder="Password" />
		<Button>Login</Button>
	</section>
</form>
