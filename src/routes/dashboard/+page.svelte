<script lang="ts">
  //import '../styles.css';
  import Sidebar from "./sidebar.svelte";
  import ProjectStatusesBox from "./projectStatusesBox.svelte";
  import ProjectTasksBox from "./projectTasksBox.svelte";
  import ProjectDeadlinesBox from "./projectDeadlinesBox.svelte";
  import type { PageData } from "./$types";
  import type {user} from '../../user';

  export let data: PageData;

  let user = data.user;
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="app">
  <div id="wrapper">
    <Sidebar user={user} />
    <div id="dashboard">
      <ProjectStatusesBox />
      <ProjectTasksBox />
      <ProjectDeadlinesBox />
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

  #dashboard {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
