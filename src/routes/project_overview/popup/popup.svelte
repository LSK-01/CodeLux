<script lang='ts'>
    export let isOpen = false;
    export let popupMsgs: string[];
    export let success = true;
    import Button from "../../Button.svelte";

    // Function to close popup
    function close() {
        isOpen = false;
    }
</script>

<!-- Show popup if open -->
{#if isOpen}
<div id='popUp'>
    <h2>Running code analysis...</h2>
    {#each popupMsgs as msg}
        <p>{msg}</p>
    {:else}
        {#if success}
            <span class="material-symbols-outlined good">check_circle</span>
            <p>Code analysis successfully complete.</p>
            <Button click={()=>close()}>
                <span class="material-symbols-outlined">close</span>
            </Button>
        {:else}
            <span class="material-symbols-outlined bad">error</span>
            <p>Code analysis failed.</p>
            <Button click={()=>close()}>
                <span class="material-symbols-outlined">close</span>
            </Button>
        {/if}
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
		border-radius: 5px;
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