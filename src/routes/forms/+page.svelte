<svelte:head>
	<title>Surveys</title>
	<meta name="description" content="survey" />
</svelte:head>

<script>
	import Radio from './Radio.svelte'

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

<div class="centered">
    <h1 class="qheading">
        Question 1
    </h1>
    <div class="form">
        <Radio {options} question={getQuestions()[0]} bind:userSelected={radioValue}/>
    </div>
    <p>
        {radioValue} is selected
    </p>
</div>


<style>
    .qheading{
        font-weight: bold;
        padding-bottom: 5px;
    }
    .centered{
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }
    .vl {
        border-left: 6px solid green;
        height: 500px;
        position: absolute;
        left: 50%;
        margin-left: -3px;
        top: 0;
    }
</style>