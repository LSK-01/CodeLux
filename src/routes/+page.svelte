<script lang="ts">
import Button from './Button.svelte';
import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class=" self-center pt-10 pb-48">
	<h1 class=" text-7xl">Pimp my Project</h1>
</div>
<section class=" flex justify-center items-center flex-col">
    <p>homepage shit</p>

    <Button click={() => goto('/signup')}>Sign Up</Button>
</section>

