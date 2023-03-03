<!-- https://codepen.io/mr-t77/pen/jRzmMZ -->

<script lang="ts">
  export let options : any[number][string];
  export let question : string;
  export let name : string;
  // export let userSelected : number;
</script>  

<fieldset id={name}>
<div class="centered">
    <div class="padding">{question}</div>
    <ul class='likert'>
      {#each options as { value, label }}
        <li>
          <input type="radio" class="likert" name={name} value={value}>
          <label class="subh" for={label}>{label}</label>
        </li>
      {/each}
    </ul>
</div> 
</fieldset> 

<style>
  .padding{
    padding-bottom: 20px;
  }
  .centered{
      margin: 0 auto;
  }
  .subh{
      font-size: 11px;
      white-space: pre-wrap;
  }
  .likert:last-of-type {border-bottom:0;}
  .likert:before {
    z-index: -1;
    content: '';
    position:relative;
    top:8px;
    left:20%;
    display:block;
    background-color:#000000;
    height:3px;
    width:60%;
  }
  .likert li {
  display:inline-block;
  width:10%;
  text-align:center;
  vertical-align: top;
  }
  .likert li input[type=radio] {
  display:block;
  position:relative;
  top:0;
  left:50%;
  margin-left:-6px;
  }
</style>