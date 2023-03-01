<!-- https://svelte.dev/repl/7b05d57dcdc04f49be72844e4b2825b3?version=3.44.0 -->
<script lang="ts">
    import Radio from './Radio.svelte';
	import "../styles.css";
	
	export let active_step : number;
	export let options : any[number][string];    
	export let questions : string[];

	let formData = Array(questions.length);
	
    //TODO: POST data back to database or however firebase works
	const handleSubmit = () => {
		console.log("Your form data => ",formData)
	}

</script>

<!-- TODO: redirect user to another page when complete -->
<form class="form-container" on:submit={handleSubmit}>
	{#if active_step != questions.length+1}
        <div class="centered">
            <h1 class="qheading">
                Question {active_step}
            </h1>
            <div class="padding">
                <Radio {options} question={questions[active_step-1]} bind:userSelected={formData[active_step-1]}/>
            </div>
        </div>        
	{:else}
		<div class="message">
            <h1 class="qheading">
                Confirmation
            </h1>			
			<h2>Thank you for completing the survey</h2>
			<button class="btn submit">Submit</button>
		</div>
	{/if}
</form>

<style>
	.qheading {
        font-weight: bold;
        font-size: 24px;
    }
    .padding {
        padding-top: 10px;
    }
	.form-container {
		background-color: var(--fg3);
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
		padding: 20px 10px;
		text-align: center;
		width: 100%;
	}
	.btn{
		color: #2d3436;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		display: inline-block;
		width: 100%;
		border-radius: 0.25rem;
		cursor:pointer;
	}
	.submit{
		background:linear-gradient(to bottom, #4ade80 5%, #4ade80 100%);
		background-color:#4ade80;
	}
	.submit:hover {
		background:linear-gradient(to bottom, #4ade80 5%, #4ade80 100%);
		background-color:#4ade80;
	}
	.message{
		text-align: center;
	}
</style>
