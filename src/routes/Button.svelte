<script lang="ts">
 export let click = () => {};
</script>

<button on:click={click} class=" bg-red-200 w-32 h-10 rounded-lg hover:bg-red-400 drop-shadow-md"><slot></slot></button>

<style>
	button {
		display: flex;
		justify-content: space-evenly;
		height: fit-content;
        width: fit-content;
        padding: 10px;
        align-items: center;
		border-radius: 10px;
		background-color:var(--fg3);
		transition: background-color var(--speed);
	}

	button:hover {
		background-color:var(--bg2);
	}
</style>