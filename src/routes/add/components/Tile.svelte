<script lang="ts">
  // Import global styles
  import "../../styles.css";
</script>

<!-- Use the default slot to display the contents of the tile -->
<div class="tile">
  <slot></slot>
</div>

<style>
  .tile {
    background-color: var(--fg1);
    color: var(--text);
    box-shadow: var(--outset);
    border-radius: 10px;
    padding: 40px 50px;
    position: relative;
  }
</style>