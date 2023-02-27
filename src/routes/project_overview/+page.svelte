<script lang="ts">
    import "../styles.css";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<svelte:head>
    <title>Overview</title>
</svelte:head>

<div id="projectOverview">
    <h1>{data.projectName}</h1>
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

    #projectOverview {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 10px;
        flex-wrap: wrap;
    }
</style>
