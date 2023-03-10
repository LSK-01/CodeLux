<script lang='ts'>
    export let isOpen = false;
    export let popupMsgs:string[] = [];
    function close() {
        isOpen = false;
    }
    import Button from "../../Button.svelte";
</script>

{#if isOpen}
<div>
    <h2>Running code analysis...</h2>
    {#each popupMsgs as msg}
        <p>{msg}</p>
    {/each}
    <Button click={()=>close()}>Close</Button>
</div>
{/if}

<style>
    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--fg2);
		border-radius: 5px;
        gap: 10px;
		padding: 10px;
        border: 2px solid;
        z-index: 2;
    }
</style>