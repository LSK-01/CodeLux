<script lang="ts">
  import "../../styles.css";
</script>

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