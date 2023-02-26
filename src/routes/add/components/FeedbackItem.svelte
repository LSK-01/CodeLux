<script>
  import Tile from './Tile.svelte'
  /**
     * @type {{ text: string; question: string; rating: any; }}
     */
   export let item

</script>

<div id = "wrapper">
  <Tile>
    <!--<button class="close" on:click={() => handleDelete(item.id)}>X</button>-->
    <p class="text-display">
      {#if item.text != ''}
        {item.question + " : " + item.text}
      {:else}
        { item.question }
        <div class="num-display">
          {item.rating}
        </div>
      {/if}
    </p>
  </Tile>
</div>

<style>
  .num-display {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 50px;
    height: 50px;
    background: #ffcccc;
    color: #fff;
    border: 1px #eee solid;
    border-radius: 50%;
    padding: 10px;
    text-align: center;
    font-size: 19px;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    background: none;
    border: none;
  }

  #wrapper {
		margin: 10px 100px;
	}
</style>