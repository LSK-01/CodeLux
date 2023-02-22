<script lang="ts">
  import '../styles.css';
  // import Sidebar from "./sidebar.svelte";
</script>

<svelte:head>
  <title>Overview</title>
</svelte:head>

<div class="app">
  <div id="wrapper">
    <!-- <Sidebar /> -->
    <div id="overview">
    </div>
  </div>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-evenly;
    flex: 1;
    padding: 0 10vw;
  }

  #wrapper {
    display: flex;
    flex: 1;
    margin: 10px 0;
    flex-direction: column;
    gap: 10px;
  }

  #overview {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
