<!-- https://codepen.io/mr-t77/pen/jRzmMZ -->

<script lang="ts">
  export let options;
  export let question: string;
  export let userSelected = options[0].value;
</script>  

<div class="centered">
  <form action="">
    <div class="padding">
      <label class="statement">{question}</label>
    </div>
    <ul class='likert'>
      {#each options as { value, label }}
        <li>
          <input type="radio" name="likert" value={value} bind:group={userSelected}>
          <label class="subh" for={label}>{label}</label>
        </li>
      {/each}
    </ul>
  </form>
</div>  

<style>
    .padding{
      padding-bottom: 5px;
    }
    .centered{
        margin: 0 auto;
    }
    .statement{
        text-align: center;
        font-size: 16px;
    }
    .subh{
        font-size: 11px;
        white-space: pre-wrap;
    }
    form .likert:last-of-type {border-bottom:0;}
    form .likert:before {
    content: '';
    position:relative;
    top:8px;
    left:20%;
    display:block;
    background-color:#000000;
    height:3px;
    width:60%;
    }
    form .likert li {
    display:inline-block;
    width:10%;
    text-align:center;
    vertical-align: top;
    }
    form .likert li input[type=radio] {
    display:block;
    position:relative;
    top:0;
    left:50%;
    margin-left:-6px;
    
    }
    form .buttons button {
    padding: 5px 10px;
    background-color: #67ab49;
    border: 0;
    border-radius: 3px;
    }
    form .buttons .clear {background-color: #e9e9e9;}
    form .buttons .submit {background-color: #67ab49;} 
    form .buttons .clear:hover {background-color: #ccc;}
    form .buttons .submit:hover {background-color: #14892c;} 
</style>