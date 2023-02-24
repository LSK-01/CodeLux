<script>
  import {v4 as uuidv4} from 'uuid'
  import {FeedbackStore} from '../stores'
  import Card from './Card.svelte'
  import Button from './Button.svelte'
  import RatingSelect from './RatingSelect.svelte'

  let text = ''
  let rating = 10
  let btnDisabled = true
  let min = 10
  let message
  let questions =  ["Project Name","Project Description", "Manager Username","Developer Username(s)", "Project Time Frame", 
                    "Github link to Source Code Files", "Satsfaction", "Confidence", "Customer Contact Frequency", "Customer Satsfaction",
                    "Completion Percentage", "Budget", "Start Date", "Deadline"]
  let questions_new = [["Project Name",false],["Project Description",true], ["Manager Username",true],
                      ["Developer Username(s)",true], ["Project Time Frame",true], ["Github link to Source Code Files",true], 
                      ["Satsfaction",false], ["Confidence",false], ["Customer Contact Frequency", true], ["Customer Satsfaction", true],
                    ["Completion Percentage",true], ["Budget",true], ["Start Date",true],[ "Deadline",true]]                  
  let count = 0

  const handleSelect = (e) => {
    rating = e.detail
    message = null
    btnDisabled = false
    text = ""
  }

  const handleInput = () => {
    if(text.trim().length <= min) {
      message = `Text must be at least ${min} characters`
      btnDisabled = true
    } else {
      message = null
      btnDisabled = false
      rating = -1
    }
  }

  const handleSubmit = () => {
    if(text.trim().length > -1) {
      if(text != ''){
        rating = -1
      }
      const newFeedback = {
        id: uuidv4(),
        question : questions_new[count][0],
        text,
        rating: +rating,
      }

      FeedbackStore.update((currentFeedback) => {
        return [newFeedback, ...currentFeedback]
      })

      text = ''
    }

    count += 1
    if (count == questions.length){
      alert("All questions answered !")
      handleReset()
      
    }
  }

  function handleReset() {
      count = 0
      FeedbackStore.update(() => {
        return []
      })
      
  }
  
</script>

<!--Card > 
  <header>
    <h2>{questions[count]}</h2>
  </header>
<form on:submit|preventDefault={handleSubmit}>
  <RatingSelect on:rating-select={handleSelect} />
  <div class="input-group">
    <input type="text" on:input={handleInput} bind:value = {text} placeholder="Answer here ">
    <Button disabled={btnDisabled} type="submit">Send</Button>
  </div>
  {#if message}
    <div class="message">
      {message}
    </div>
  {/if}
</form>
</Card-->

<Card > 
  <header>
    <h2>{questions_new[count][0]}</h2>
  </header>
<form >
  {#if questions_new[count][1] == true}
    <div class="input-group">
      <input type="text" on:input={handleInput} bind:value = {text} placeholder="Answer here ">
    </div>
  {:else}
    <RatingSelect on:rating-select={handleSelect} />
  {/if}
  <!--Button disabled={btnDisabled} type="submit">Send</Button-->
  <button on:click={handleSubmit}>Send</button>
  {#if message}
    <div class="message">
      {message}
    </div>
  {/if}
</form>
</Card>

<!--<button on:click={() => ( FeedbackStore.update((currentFeedback) => { return []}) )}> Add New Project </button>-->
<button on:click={handleReset}> Add New Project 2 </button>


<style>
  header {
    max-width: 400px;
    margin: auto;
  }

  header h2 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }

  .input-group {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    padding: 8px 10px;
    border-radius: 8px;
    margin-top: 15px;
  }

  input {
    flex-grow: 2;
    border: none;
    font-size: 16px;
  }

  input:focus {
    outline: none;
  }

  .message{
    padding-top: 10px;
    text-align: center;
    color: rebeccapurple;
  }
</style>
