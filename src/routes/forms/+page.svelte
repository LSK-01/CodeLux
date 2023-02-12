<svelte:head>
	<title>Surveys</title>
	<meta name="description" content="survey" />
</svelte:head>

<script lang="ts">
	import Form from './Form.svelte';
	import ProgressBar from './ProgressBar.svelte';

    let steps : (string|number)[];
	steps = Array.from({length: getQuestions().length}, (_, index) => index + 1);
	steps = steps.concat("Confirmation");
	let currentActive : number = 1;
	let progressBar : ProgressBar;

    let radioValue;

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

	const handleProgress = (stepIncrement : number) => {
		progressBar.handleProgress(stepIncrement)
	}

    const options = [{
		value: -3,
		label: "Strongly\n disagree",
	}, {
		value: -2,
		label: "Disagree",
	}, {
		value: -1,
		label: "Somewhat\n disagree",
	}, {
        value: 0,
        label: "Neither agree\n nor disagree",
    }, {
		value: 1,
		label: "Somewhat\n agree",
	}, {
		value: 2,
		label: "Agree",
	}, {
		value: 3,
		label: "Strongly\n agree",
	}]
</script>

<div class="container">
    <ProgressBar {steps} bind:currentActive bind:this={progressBar}/>
    
    <Form {options} questions={getQuestions()} active_step={currentActive}/>

    <div class="step-button">
        <button class="btn" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Prev</button>
        <button class="btn" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Next</button>
    </div>		
</div>

    <div class="step-button">
        <button class="btn" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Prev</button>
        <button class="btn" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Next</button>
    </div>		
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
    .container{
        padding-top: 20px
    }	
	
	* {
		box-sizing: border-box;
	}

	.btn {
		background-color: #3498db;
		color: #fff;
		border: 0;
		border-radius: 6px;
		cursor: pointer;
		font-family: inherit;
		padding: 8px 30px;
		margin: 5px;
		font-size: 14px;
	}

	.btn:active {
		transform: scale(0.98);
	}

	.btn:focus {
		outline: 0;
	}

	.btn:disabled {
		background-color: #e0e0e0;
		cursor: not-allowed;
	}
	
	.step-button{
		margin-top: 1rem;
		text-align: center;
	}
</style>