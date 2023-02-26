<script lang="ts">
  import {FeedbackStore} from '../stores'
  import Tile from './Tile.svelte'
  import RatingSelect from './RatingSelect.svelte'

  let text = ''
  let rating = -1
  let question_num = 0
  let questions_new = [["Project Name",true],["Project Description",true], ["Manager Username",true],
                      ["Developer Username(s)",true], ["Project Time Frame (in hours)",true], ["Github link to Source Code Files",true], 
                      ["Satsfaction",false], ["Confidence",false], ["Customer Contact Frequency (times per month)", true], ["Customer Satsfaction", true],
                    ["Completion Percentage",true], ["Budget (in british pounds)",true], ["Start Date (in format Day/Month/Year)",true],[ "Deadline  (in format Day/Month/Year)",true]]     
  handleReset()

  const handleSelect = (numb: any) => {
    rating = numb.detail
    text = ""
  }

  const handleInput = () => {
    rating = -1
  }

  const handleSubmit = () => {
      const newFeedback = {
        question : questions_new[question_num][0],
        text,
        rating: +rating,
      }

      // @ts-ignore
      FeedbackStore.update((currentFeedback) => {
        return [newFeedback, ...currentFeedback]
      })

      text = ''

    question_num += 1
    if (question_num == questions_new.length){
      alert("All questions answered !")
      handleReset()
    }
  }

  function handleReset() {
    question_num = 0
      FeedbackStore.update(() => {
        return []
      })
  }
  
</script>

<div id = "wrapper">
  <h1 on:load={handleReset}> 
    Add Project
  </h1>
  <Tile > 
    <header>
      <h2>{questions_new[question_num][0]}</h2>
    </header>
  <form >
    {#if questions_new[question_num][1] == true}
      <div class="input-group">
        <input type="text" on:input={handleInput} bind:value = {text} placeholder="Answer here ">
      </div>
    {:else}
      <RatingSelect on:rating-select={handleSelect} />
    {/if}
    <br/>
    <button on:click={handleSubmit} class=" bg-red-200 w-32 h-10 rounded-lg hover:bg-red-400 drop-shadow-md"><slot>Send</slot></button>
    <button on:click={handleReset}  class=" bg-red-200 w-32 h-10 rounded-lg hover:bg-red-400 drop-shadow-md"><slot>Restart</slot> </button> 
  </form>

</Tile>
</div>

<style>

  .input-group {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    padding: 8px 10px;
    border-radius: 8px;
    margin-top: 15px;
  }


  input:focus {
    outline: none;
  }

  #wrapper {
		margin: 10px 100px;
	}

</style>
