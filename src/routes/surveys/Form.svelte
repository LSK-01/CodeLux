<!-- https://svelte.dev/repl/7b05d57dcdc04f49be72844e4b2825b3?version=3.44.0 -->
<script lang="ts">
    import Radio from './Radio.svelte';
	import "../styles.css";
	
	export let options : any[number][string];    
	export let questionData : any[];
</script>

<form class="form-container" method="POST">
	{#each questionData as { question, metric, qid }, i}
        <div class="centered">
            <h1 class="qheading">
                Question {i+1}
            </h1>
            <div class="padding">
				<!-- name is as such because we can have multiple questions measuring the same metric -->
                <Radio {options} name={metric + ":" + qid} question={question} />
            </div>
        </div>   
	{/each}     
	<div class="message">
		<button  type="submit" class="btn submit">Submit survey</button>
	</div>
</form>

<style>
	.qheading {
        font-weight: bold;
        font-size: 24px;
    }
    .padding {
        padding-top: 10px;
    }

	.centered{
		border-radius: 10px;
		background-color: var(--fg1);
		padding: 20px;
		margin: 10px;
	}
	.form-container {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
		padding: 50px 20px;
		text-align: center;
		max-width: 100%;
		width: 100%;
		gap: 5px;
	}
	.btn{
		background-color: #fca5a5;
		padding: 10px;
		margin-top: 0.5rem;
		display: inline-block;
		width: 200px;
		font-weight: bold;
		font-size: 20px;
		border-radius: 10px;
		cursor:pointer;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.05);
	}
	.message{
		text-align: center;
	}
</style>