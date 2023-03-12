<script lang="ts">
import Button from './Button.svelte';
import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div id='box'>
  <div class="title">
    <h1>Welcome to</h1>
    <h1 class="text-7xl">CodeLux</h1>
  </div>
</div>

<style>
  .title {
    padding: 50px;
  }

  #box {
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

  section{
    width: 100%;
    display: flex;
    margin: 50px;
    justify-content: space-evenly;
  }
</style>
