<svelte:head>
	<title>Surveys</title>
	<meta name="description" content="survey" />
</svelte:head>

<script>
	import Form from './Form.svelte';
	import ProgressBar from './ProgressBar.svelte';

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

    let steps = Array.from({length: getQuestions().length}, (_, index) => index + 1).concat("Confirmation"), currentActive = 1, progressBar;
	const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}

    let radioValue;

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

<!-- new bit -->
<div class="container">
    <ProgressBar {steps} bind:currentActive bind:this={progressBar}/>
    
    <Form {options} active_step={steps[currentActive-1]}/>

    <div class="step-button">
        <button class="btn" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Prev</button>
        <button class="btn" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Next</button>
    </div>		
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

    .qheading{
        font-weight: bold;
        padding-bottom: 5px;
    }
    .centered{
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }
	
	
	* {
		box-sizing: border-box;
	}

	main {
		font-family: 'Muli', sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		overflow: hidden;
		margin: 0;
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