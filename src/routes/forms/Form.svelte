<!-- https://svelte.dev/repl/7b05d57dcdc04f49be72844e4b2825b3?version=3.44.0 -->
<script lang="ts">
    import Radio from './Radio.svelte';
	
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
<!--<form class="form-container"  on:submit={handleSubmit} method="POST" action="?/store">
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
			<input type="text" id="lname" name="lname"><br><br>
			<button  type="submit" class="btn submit">Submit</button>
		</div>
	{/if}
</form>-->

<form class="form-container"  on:submit={handleSubmit} method="POST" action="?/store">
	<fieldset id="group1">
		<div class="centered">
            <h1 class="qheading">
                Question 1
            </h1>
			My manager supports me in any training I want to undertake to help me perform my role better<br>
			<input type="radio" name="q1" value=0>Strongly disagree
			<input type="radio" name="q1"value=1>Disagree
			<input type="radio" name="q1"value=2>Somewhat disagree
			<input type="radio" name="q1"value=3>Neither agree nor disagree
			<input type="radio" name="q1"value=4>Somewhat agree
			<input type="radio" name="q1"value=5>agree   
			<input type="radio" name="q1"value=6>Strongly agree
		</div> 
	  </fieldset>

	<div class="padding"></div>
	<fieldset id="group2">
		<div class="centered">
            <h1 class="qheading">
                Question 2
            </h1>
			I enjoy being a part of my company’s culture<br>
			<input type="radio" name="q2" value=0>Strongly disagree
			<input type="radio" name="q2"value=1>Disagree
			<input type="radio" name="q2"value=2>Somewhat disagree
			<input type="radio" name="q2"value=3>Neither agree nor disagree
			<input type="radio" name="q2"value=4>Somewhat agree
			<input type="radio" name="q2"value=5>agree   
			<input type="radio" name="q2"value=6>Strongly agree
		</div> 
	  </fieldset>

	  <div class="padding"></div>
	  <fieldset id="group3">
		  <div class="centered">
			  <h1 class="qheading">
				  Question 3
			  </h1>
			  My team work well together<br>
			  <input type="radio" name="q3" value=0>Strongly disagree
			  <input type="radio" name="q3"value=1>Disagree
			  <input type="radio" name="q3"value=2>Somewhat disagree
			  <input type="radio" name="q3"value=3>Neither agree nor disagree
			  <input type="radio" name="q3"value=4>Somewhat agree
			  <input type="radio" name="q3"value=5>agree   
			  <input type="radio" name="q3"value=6>Strongly agree
		  </div> 
		</fieldset>

	  <button  type="submit" class="btn submit">Submit</button>
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
		background-color: #b8b8b8;
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
		padding: 50px 20px;
		text-align: center;
		max-width: 100%;
		width: 100%;
	}
	.btn{
		color: white;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		display: inline-block;
		width: 100%;
		border-radius: 0.25rem;
		cursor:pointer;
	}
	.submit{
		background:linear-gradient(to bottom, #44c767 5%, #50b01c 100%);
		background-color:#44c767;
	}
	.submit:hover {
		background:linear-gradient(to bottom, #50b01c 5%, #44c767 100%);
		background-color:#50b01c;
	}
	.message{
		text-align: center;
	}
</style>
