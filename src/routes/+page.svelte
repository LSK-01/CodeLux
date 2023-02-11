<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import Input from './Input.svelte'
	import Button from './Button.svelte'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class=" self-center pt-10">	
	<h1 class=" text-7xl">Pimp my Project</h1>
</div>



<section class="flex flex-col justify-center items-center flex-1 gap-5">
	<Input type="text" name="uname" placeholder="Username"></Input>
	<Input type="password" name="password" placeholder="Password"></Input>
	<Button>Login</Button>
</section>
