<svelte:head>
	<title>Surveys</title>
	<meta name="description" content="survey" />
</svelte:head>

<script lang="ts">
	import Form from './Form.svelte';
	import ProgressBar from './ProgressBar.svelte';

	export let data;
	const qs : string[] = data.post;

    let steps : (string|number)[];
	steps = Array.from({length: qs.length}, (_, index) => index + 1);
	steps = steps.concat("Confirmation");
	let currentActive : number = 1;
	let progressBar : ProgressBar;

	const handleProgress = (stepIncrement : number) => {
		progressBar.handleProgress(stepIncrement)
	}

    const options = [{
		value: 0,
		label: "Strongly\n disagree",
	}, {
		value: 1,
		label: "Disagree",
	}, {
		value: 2,
		label: "Somewhat\n disagree",
	}, {
        value: 3,
        label: "Neither agree\n nor disagree",
    }, {
		value: 4,
		label: "Somewhat\n agree",
	}, {
		value: 5,
		label: "Agree",
	}, {
		value: 6,
		label: "Strongly\n agree",
	}]
</script>

<div class="container">
	<div class="pheading">
		Project X : Survey
	</div>
    <ProgressBar {steps} bind:currentActive bind:this={progressBar}/>

   	<Form {options} questions={qs} active_step={currentActive}/>

    <div class="step-button">
        <button class="btn" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Prev</button>
        <button class="btn" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Next</button>
    </div>		
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
    .container{
        padding-bottom: 20px
    }	
	.pheading{
		padding: 15px;
		font-weight: bold;
        font-size: 36px;
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