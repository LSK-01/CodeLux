<script lang="ts">
	import '../styles.css';

    export let name : string;
    export let date : string;
    export let manager : boolean;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />   
</svelte:head>

<div id='projectBox'>
        <div class="boxContents">
            <span class="material-symbols-outlined">
                description
                </span>     
            <div class="projectInfo">
            <h3>{name}</h3>
            Due date: {date}
            </div>
            <div class="righticon">
                <span class="material-symbols-outlined">chevron_right</span>
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
		padding: 5px 0;
		border-radius: 5px;
		background-color: var(--fg1);
		box-shadow: inset 0 0 10px rgba(0, 0, 0);
		gap: 10px;
		padding: 15px;
        text-align: left;
        align-items: center;
		/* justify-content: space-evenly; */
	}

    .righticon{
        position: absolute;
        right: 13%
    }

</style>
