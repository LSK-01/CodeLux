<script>
  import {FeedbackStore} from '../stores'

  $: count = $FeedbackStore.length
  $: average = $FeedbackStore.reduce((a, {rating}) => a + rating, 0) / $FeedbackStore.length
</script>



<style>
  .feedback-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>