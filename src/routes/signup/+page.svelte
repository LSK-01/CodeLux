<script lang="ts">
  import Input from "../Input.svelte";
  import Button from "../Button.svelte";
  import type { ActionData } from "./$types";
  import { goto } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";
  import { browser } from "$app/environment";
  import "../styles.css";
  export let form: ActionData;
  let errorMsg = "";

  if (form && !form?.success) {
    errorMsg = "There was an error signing up.";
  }
</script>

<svelte:head>
  <title>Sign up</title>
</svelte:head>

<div id='signUpBox'>
  <div class="title">
    <h1 class=" text-7xl">CodeLux</h1>
    <h1>Sign up</h1>
  </div>
  {#if errorMsg != ""}
    <div id='errorBox'>
      <span class="material-symbols-outlined">error</span>
      <p>{errorMsg}<p>
    </div>
  {/if}
  <form method="POST">
    <section class="flex flex-col justify-center items-center flex-1 gap-5">
      <Input type="email" name="email" placeholder="Email" />
      <Input type="password" name="password" placeholder="Password" />
      <Button>Sign up</Button>
    </section>
  </form>
</div>

<style>
  .title{
    padding: 50px;
  }

  #signUpBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    border-radius: 10px;
    background-color: var(--fg1);
    box-shadow: var(--outset);
    padding: 20px;
    gap: 10px;
  }

  #errorBox {
    display: flex;
    background-color: var(--bad);
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    gap: 5px;
  }

  /* .entryWrapper{
    background-color: var(--fg2);
    text-align: center;
    border-radius: 10px;
  } */

  @media screen and (max-width: 880px) {
      #signUpBox {
        width: 100%;
      }

      .title {
        padding: 0px;
      }
	}
</style>
