<script lang="ts">
  import Input from "../Input.svelte";
  import Button from "../Button.svelte";
  import type { ActionData } from "./$types";
  import { goto } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";
  import { browser } from "$app/environment";
  import "../styles.css";

  // export let form: ActionData;

  // if (form?.success == true) {
	// if(browser){
	// 	goto("/dashboard");
	// }
  // }
</script>


<svelte:head>
  <title>Sign up</title>
</svelte:head>

<div class="title">
  <h1 class=" text-7xl">Pimp my Project</h1>
</div>

<form method="POST">
  <section class="flex flex-col justify-center items-center flex-1 gap-5">
    <Input type="email" name="email" placeholder="Email" />
    <Input type="password" name="password" placeholder="Password" />
    <Button on:click={()=>{goto("/dashboard")}}>Sign up</Button>
  </section>
</form>

<style>
  .title{
    padding: 50px;
  }

  /* .entryWrapper{
    background-color: var(--fg2);
    text-align: center;
    border-radius: 10px;
  } */
</style>
