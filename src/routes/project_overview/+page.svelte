<script lang="ts">
    import "../styles.css";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <title>Project Overview</title>
</svelte:head>

<div id="projectOverview">
    <h1>{data.name}</h1>
    <div class='boxContents' id='descBox'>
        <span class="material-symbols-outlined">info</span>
        <h3>{data.desc}</h3>
    </div>
    <div class='boxContents'>
        <div class='projectOverviewItem'>
            <span class="material-symbols-outlined">pending_actions</span>
            <p>Due on: {data.deadline}</p>
        </div>
        <div class='projectOverviewItem'>
            <span class="material-symbols-outlined">event</span>
            <p>Started on: {data.startDate}</p>
        </div>
        <div class='projectOverviewItem'>
            <span class="material-symbols-outlined">groups</span>
            <p>Developers:</p>
            {#each data.devUsernames as devUsername}
            <div class="userBox">
                <span class="material-symbols-outlined">person</span>
                <p>{devUsername}</p>
                </div>
            {/each}
        </div>
        <div class='projectOverviewItem'>
            <span class="material-symbols-outlined">payments</span>
            <p>Budget: £{data.budget}</p>
        </div>
        <div class='projectOverviewItem'>
            {#if data.status == 'At risk'}
			<span class="material-symbols-outlined">error</span>
            {:else}
            <span class="material-symbols-outlined">check_circle</span>
            {/if} 
            <p>Status: {data.status}</p>
        </div>
    </div>
</div>

<style>
    #projectOverview {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: nowrap;
        gap: 10px;
        min-height: 90vh;
        margin: 10px 10vw;
        background-color: var(--fg1);
		border-radius: 10px;
        padding: 10px;
    }

    .boxContents {
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: wrap;
        width: 100%;
		padding: 10px;
        height: 0;
        flex: 1;
        gap: 10px;
        align-items: stretch;
		border-radius: 5px;
		background-color: var(--fg1);
		box-shadow: inset 0 0 10px rgba(0, 0, 0);
	}

    .projectOverviewItem {
        display: flex;
        flex-direction: column;
        background-color: var(--fg2);
        padding: 10px;
        flex: 1 0;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
	}

    .projectOverviewItem p {
        display: flex;
        text-align: center;
	}

    #descBox {
        flex: 0;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    #descBox h3 {
        align-items: left;
    }

    #descBox span {
        float: left;
    }

    .userBox {
        align-items: center;
        display: flex;
        gap: 5px;
        width: max-content;
    }

    span {
        font-size: 50px;
    }

    .userBox span {
        font-size: 20px;
    }

</style>
