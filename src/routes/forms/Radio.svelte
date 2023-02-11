<!-- https://codepen.io/mr-t77/pen/jRzmMZ -->
<div class="centered">
  <form action="">
    <label class="statement">This HTML Likert scale is easy to use.</label>
    <ul class='likert'>
      <li>
        <input type="radio" name="likert" value=-3>
        <label class="subh">Strongly <br>disagree</label>
      </li>
      <li>
        <input type="radio" name="likert" value=-2>
        <label class="subh">Disagree</label>
      </li>
      <li>
        <input type="radio" name="likert" value=-1>
        <label class="subh">Somewhat <br>disagree</label>
      </li>
      <li>
        <input type="radio" name="likert" value=0>
        <label class="subh">Neither agree <br>nor disagree</label>
      </li>
      <li>
        <input type="radio" name="likert" value=1>
        <label class="subh">Somewhat <br>agree</label>
      </li>
      <li>
        <input type="radio" name="likert" value=2>
        <label class="subh">Agree</label>
      </li>
      <li>
        <input type="radio" name="likert" value=3>
        <label class="subh">Strongly <br>agree</label>
      </li>
    </ul>
  </form>
</div>  

<style>
    .centered{
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }
    .statement{
        text-align: center;
        font-size: 16px;
    }
    .subh{
        font-size: 11px;
    }
    form .likert:last-of-type {border-bottom:0;}
    form .likert:before {
    content: '';
    position:relative;
    top:11px;
    left:18.5%;
    display:block;
    background-color:#000000;
    height:4px;
    width:63%;
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