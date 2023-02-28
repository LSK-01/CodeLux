<script lang="ts">
  import Input from "../Input.svelte";
  import Button from "../Button.svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  if (form?.success == true) {
    if (browser) {
      goto("/dashboard");
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="title">
  <h1 class=" text-7xl">Pimp my Project</h1>
</div>

<form method="POST">
  <section class="flex flex-col justify-center items-center flex-1 gap-5">
    <Input type="text" name="email" placeholder="Email" />
    <Input type="password" name="password" placeholder="Password" />
    <Button>Login</Button>
  </section>
</form>

<style>
  .title{
    padding: 50px;
  }
</style>