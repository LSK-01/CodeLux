<script lang='ts'>
    export let isOpen = false;
    function open() {
        isOpen = true;
    }
    function close() {
        isOpen = false;
    }
    import Button from "../../Button.svelte";
</script>

{#if isOpen}
<button>
    <h2>Code analysis is under under way</h2>
    <p>Analysis score will be updated when complete.</p>
    <Button on:click={close}>Close</Button>
</button>
{/if}

<style>
    button {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--fg3);
        max-width: 30%;
		border-radius: 10px;
        margin: auto;
		border: none;
		padding: 10px;
    }
</style>