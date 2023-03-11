<script lang='ts'>
    export let isOpen = false;
    export let popupMsgs: string[];
    import Button from "../../Button.svelte";
    function close() {
        isOpen = false;
    }
</script>

{#if isOpen}
<div>
    <Button click={()=>close()}>
        <span class="material-symbols-outlined">close</span>
    </Button>
    <h2>Running code analysis...</h2>
    {#each popupMsgs as msg}
        <p>{msg}</p>
    {/each}
</div>
{/if}

<style>
    div {
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
</style>