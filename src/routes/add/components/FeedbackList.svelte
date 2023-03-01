<!-- <script>
  import {FeedbackStore} from '../stores'
  import { fade, scale } from 'svelte/transition'
  import FeedbackItem from './FeedbackItem.svelte'
</script>

<div id = "wrapper">
  {#each $FeedbackStore as fb (fb.id)}
  <div in:scale out:fade="{{ duration: 500 }}">
    <FeedbackItem item={fb} />
  </div>
  {/each}
</div>

<style>
    #wrapper {
		display: flex;
		flex: 1;
		margin: 10px 100px;
		flex-direction: column;
		gap: 10px;
	}
</style> -->