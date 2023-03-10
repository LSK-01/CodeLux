<script lang="ts">
  import Input from "../Input.svelte";
  import Button from "../Button.svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import type { ActionData } from "./$types";
  import { getIdToken } from "firebase/auth";

  export let form: ActionData;

  // if (form?.success == true) {
  //   if (browser) {
  //     goto("/dashboard");
  //   }
  // } else 
  if (form?.success == false) {
    console.log("error when logging in");
  }
</script>

<svelte:head>
  <title>Log in</title>
</svelte:head>

<div class="title">
  <h1 class=" text-7xl">Pimp my Project</h1>
</div>

<form method="POST">
  <section class="flex flex-col justify-center items-center flex-1 gap-5">
    <Input type="email" name="email" placeholder="Email" />
    <Input type="password" name="password" placeholder="Password" />
    <Button>Log in</Button>
  </section>
</form>

<style>
  .title {
    padding: 50px;
  }
</style>
