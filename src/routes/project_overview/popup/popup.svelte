<script lang="ts">
    import "../../styles.css";
    export let openPopup = false;
    export let popupMsgs: string[];
    export let success = true;
    import Button from "../../Button.svelte";
    function close() {
        openPopup = false;
    }
</script>

{#if openPopup}
<div id="bg">
    <div id="popUp">
        <h2>Running code analysis...</h2>
        {#if popupMsgs.length > 0}
            <span class="loader" />
        {/if}
        {#each popupMsgs as msg}
            <p>{msg}</p>
        {:else}
        {#if success}
            <span class="material-symbols-outlined good">check_circle</span>
            <p>Code analysis successfully complete.</p>
        {:else}
            <span class="material-symbols-outlined bad">error</span>
            <p>Code analysis failed.</p>
        {/if}
        <Button click={() => close()}>
            <span class="material-symbols-outlined">close</span>
        </Button>
        {/each}
    </div>
</div>
{/if}

<style>
    #bg {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(6px);
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height:100%;
        width:100%;
    }

    #popUp {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        background-color: var(--fg2);
        border-radius: 10px;
        gap: 10px;
        padding: 10px;
        flex: 1;
        border: 2px solid;
        z-index: 2;
    }

    #popUp > span {
        font-size: 50px;
    }

    .loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        animation: rotate 1s linear infinite;
    }

    .loader::before,
    .loader::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        inset: 0px;
        border-radius: 50%;
        border: 5px solid var(--bg1);
        animation: prixClipFix 2s linear infinite;
    }
    .loader::after {
        transform: rotate3d(90, 90, 0, 180deg);
        border-color: var(--bg2);
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes prixClipFix {
        0% {
            clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
        }
        50% {
            clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
        }
        75%,
        100% {
            clip-path: polygon(
                50% 50%,
                0 0,
                100% 0,
                100% 100%,
                100% 100%,
                100% 100%
            );
        }
    }
</style>
