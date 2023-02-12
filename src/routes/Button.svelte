<script lang="ts">
 export let click = () => {};
</script>

<button on:click={click} class=" bg-red-300 w-32 h-10 rounded-lg hover:bg-red-400 drop-shadow-md"><slot></slot></button>