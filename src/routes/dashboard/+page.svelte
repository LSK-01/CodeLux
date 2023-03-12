<script lang="ts">
    import "../styles.css";
    import OverviewsBox from "./OverviewsBox.svelte";
    import TasksBox from "./TasksBox.svelte";
    import SurveysBox from "./SurveysBox.svelte";
    import DeadlinesBox from "./DeadlinesBox.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<!-- Display title -->
<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<div id="dashboard">
    <!-- Render overviews box -->
    <OverviewsBox {data} />
    <div>
        <!-- Render other boxes -->
        <DeadlinesBox deadlineList={data.deadlineList} />
        <SurveysBox surveyList={data.surveyList} />
        <TasksBox taskList={data.taskList} />
    </div>
</div>

<style>
    #dashboard {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 10px 10vw;
        gap: 10px;
        flex-wrap: wrap;
    }

    #dashboard div {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        flex: 1;
    }

    @media screen and (max-width: 880px) {
        #dashboard div {
            flex-direction: column;
        }
    }
</style>
