<script lang="ts">
    export let name: string;
    export let placeholder: string;  
    export let type: string;   
</script>

<input type={type} id="{name}" placeholder="{placeholder}" name="{name}" class=" bg-blue-200 drop-shadow-sm rounded-lg w-72 h-9 outline-slate-400 placeholder-slate-400 pl-3" required/>

<style>
    input:focus {
        outline: none;
        background-color: var(--fg3);
        transition: background-color var(--speed);
    }
</style>