<script lang="ts">
	import "../styles.css";
    import { goto } from '$app/navigation';
</script>

<!-- Show this page after survey finished  -->
<div class="restricted">
    <div id="outerContainer">
        <div class="container">
            <div class=" flex justify-center items-center flex-col gap-5">
                <h1>Your survey response has been submitted</h1>
                <button class="linkButton" on:click={() => goto('/dashboard')}>Go to dashboard</button>
                <button class="linkButton" on:click={() => goto('/projects/all')}>All projects</button>
            </div>
        </div>
    </div>
</div>

<style>
    .restricted {
      padding: 0 10vw;
    }
  
    #outerContainer {
      margin: 10px 0;
      gap: 10px;
    }

    .container{
		padding: 50px;
		background-color: var(--fg1);
		border-radius: 10px;
    }

    .linkButton{
        width: 150px;
        border-radius: 10px;
        background-color: #fca5a5;
        padding: 10px;
    }
</style>