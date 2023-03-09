<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Shows all projects for a user" />

    
</svelte:head>

<script lang='ts'>
    import ProjectListBox from "./projectListBox.svelte";
    import type {user} from '../../../user';

    export let user: user;

    export let data;
    const title : string = data.post[0];
	const projectData : any[] = data.post[1];
</script>

<div id="container">
    <ProjectListBox title={ title } projectData={ projectData }/>
</div>

<style>
    #container {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 10px;
        margin: 10px 10vw;
        flex-wrap: wrap;
    }
</style>
  