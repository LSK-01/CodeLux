<svelte:head>
	<title>Surveys</title>
	<meta name="description" content="survey" />
</svelte:head>

<script lang="ts">
	import Form from './Form.svelte';
	export let data;

	const projectName : string = data.post[0];

	const questionData : any[] = data.post[1];

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
		Project {projectName} : Survey
	</div>
   	<Form {options} questionData={questionData}/>
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
    /* .container{
		width: calc(80%);
        padding-bottom: 20px;
    }	 */

	.container {
		display: flex;
		flex-direction: column;
		min-height: 90vh;
		/* justify-content: space-evenly; */
		padding: 0 10vw;
		flex: 1;
		margin: 5px 0;
		gap: 5px;
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
		background-color: #fca5a5;
		color: #2d3436;
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