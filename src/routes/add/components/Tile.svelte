<script lang="ts">
  import "../../styles.css";
</script>

<div class="tile">
  <slot></slot>
</div>

<style>
  .tile {
    background-color: var(--fg1);
    color: #333;
    border-radius: 15px;
    padding: 40px 50px;
    margin: 20px 0;
    position: relative;
  }
</style>