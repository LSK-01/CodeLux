<script lang="ts">
  import Input from "../Input.svelte";
  import Button from "../Button.svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import type { ActionData } from "./$types";
  import { getIdToken } from "firebase/auth";

  export let form: ActionData;
  let errorMsg = "";

  // if (form?.success == true) {
  //   if (browser) {
  //     goto("/dashboard");
  //   }
  // } else 
  if (form && form?.success == false) {
    errorMsg = "Email or password was incorrect.";
    console.log("error when logging in");
  }
</script>

<svelte:head>
  <title>Log in</title>
</svelte:head>


<div id='logInBox'>
  <div class="title">
    <h1 class=" text-7xl">CodeLux</h1>
    <h1>Log in</h1>
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
      <Button>Log in</Button>
    </section>
  </form>
</div>


<style>
  .title {
    padding: 50px;
  }

  #logInBox {
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

  @media screen and (max-width: 880px) {
      #logInBox {
        width: 100%;
      }

      .title {
        padding: 0px;
      }
	}
</style>
