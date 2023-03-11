<script lang="ts">
import Button from './Button.svelte';
import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="title">
	<h1 class=" text-7xl">CodeLux</h1>
</div>
<section class=" flex justify-center items-center flex-col gap-5">
    <Button click={() => goto('/login')}>Log in</Button>
    <Button click={() => goto('/signup')}>Sign Up</Button>
</section>

<style>
    .title{
    padding: 50px;
  }
</style>
