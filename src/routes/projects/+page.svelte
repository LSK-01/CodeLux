<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Shows all projects for a user" />
</svelte:head>

<script lang='ts'>
    import ProjectListBox from "./projectListBox.svelte";

    export let data;
	const projectData : any[] = data.post;

</script>

<div class="app">
    <div id="wrapper">
        <div id="container">
            <ProjectListBox projectData={ projectData }/>
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
  
    #container {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 10px;
        flex-wrap: wrap;
    }
</style>
  