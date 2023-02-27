<script lang="ts">
    import "../styles.css";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<svelte:head>
    <title>Project Overview</title>
</svelte:head>

<div id="projectOverview">
    <h1>{data.name}</h1>
    <div class='projectOverviewItem'>
        <p>Due: {data.deadline}</p>
    </div>
    <div class='projectOverviewItem'>
        <p>Status: {data.status}</p>
    </div>
    <div class='projectOverviewItem'>
        <p>Budget: £{data.budget}</p>
    </div>
</div>

<style>
    #projectOverview {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 10px;
        margin: 10px 10vw;
        flex-wrap: wrap;
    }

    .projectOverviewItem {
        margin: 5px 0;
        
        background-color:var(--fg2);
        padding: 10px;
        border-radius: 5px;
	  }

    .projectOverviewItem p{
        text-align: center;
	  }
</style>
