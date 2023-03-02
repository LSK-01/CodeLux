<script lang="ts">
	import '../styles.css';

    export let name : string;
    export let extraInfo : string;
    export let icon : string;
</script>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />   
</svelte:head>

<div id='projectBox'>
        <div class="boxContents">
            <span class="material-symbols-outlined">
                {icon}
            </span>     
            <div class="projectInfo">
            <h3>{name}</h3>
            {extraInfo}
            </div>
        </div>
</div>

<style>

    .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
    }
	.boxContents {
        height: 75px;
		flex: 1 0;
		display: flex;
		padding: 5px;
		border-radius: 5px;
		background-color: var(--fg3);
		gap: 10px;
		padding: 15px;
        text-align: left;
        align-items: center;
		/* justify-content: space-evenly; */
	}

</style>
