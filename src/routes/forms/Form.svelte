<!-- https://svelte.dev/repl/7b05d57dcdc04f49be72844e4b2825b3?version=3.44.0 -->
<script>
    import Radio from './Radio.svelte';
	export let active_step;
	let formData = {
		name: '',
		surname: '',
		email: '',
		password: '',
		address: '',
		city: '',
		country: '',
		postcode: '',
		account_name: '',
		card_no: ''
	}

    function getQuestions(){
        //will be different based on employee or manager
        const questions = [
            "I have received adequate training to help me complete the project", 
            "My manager supports me in any training I want to undertake to help me perform my role better", 
            "My team is easy to communicate with", 
            "My team work well together", 
            "I feel recognised and valued for my role and contribution to this project", 
            "I enjoy being a part of my company’s culture", 
            "I feel confident the project will be finished on time",
            "My team have the resources and skills necessary to complete the project", 
            "I feel satisfied with the frequency of feedback received from the customer" 
        ];
        return questions;
    }
	
	const handleSubmit = () => {
		console.log("Your form data => ",formData)
	}

    export let options;    
    let radioValue;

</script>

<form class="form-container" on:submit={handleSubmit}>
	{#if active_step != 'Confirmation'}
        <div class="centered">
            <h1 class="qheading">
                Question {active_step}
            </h1>
            <div class="form">
                <Radio {options} question={getQuestions()[active_step-1]} bind:userSelected={radioValue}/>
            </div>
            <p>
                {radioValue} is selected
            </p>
        </div>        
	{:else}
		<div class="message">
			<h2>Thank you for completing the survey</h2>
			<button class="btn submit">Submit</button>
		</div>
	{/if}
</form>

<style>
	
	.form-container {
		background-color: #fff;
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