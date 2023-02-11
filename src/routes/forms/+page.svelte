<svelte:head>
	<title>Surveys</title>
	<meta name="description" content="survey" />
</svelte:head>

<script>
	import Radio from './Radio.svelte'

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

	let radioValue;
	
</script>

<div class="centered">
    <h1>
        Question 1
    </h1>
    <Radio/>
    <p>
        {radioValue} is selected
    </p>
</div>

<style>
    .centered{
        text-align: center;
        width: 50%;
        margin: 0 auto;
    }
</style>