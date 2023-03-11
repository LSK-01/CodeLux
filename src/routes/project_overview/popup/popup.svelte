<script lang='ts'>
    export let isOpen = false;
    export let popupMsgs: string[];
    import Button from "../../Button.svelte";
    function close() {
        isOpen = false;
    }
</script>

{#if isOpen}
<div id='popUp'>
    <h2>Running code analysis...</h2>
    {#each popupMsgs as msg}
        <p>{msg}</p>
    {:else}
        <span class="material-symbols-outlined good">check_circle</span>
        <p>Code analysis successfully complete.</p>
        <Button click={()=>close()}>
            <span class="material-symbols-outlined">close</span>
        </Button>
    {/each}
</div>
{/if}

<style>
    #popUp {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--fg2);
		border-radius: 10px;
        gap: 10px;
		padding: 10px;
        flex: 1;
        border: 2px solid;
        z-index: 1;
    }

    #popUp>span {
        font-size: 50px;
    }
</style>