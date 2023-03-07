<script lang='ts'>
	import type { PageData } from "../$types";
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';
	export let data: PageData;

    function drawSurveyChart() {
        const chartElement = document.getElementById('surveyChart')!;
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: ["With surveys", "Without surveys"],
                datasets: [{
                    data: [data.withSurveys, data.withoutSurveys],
                    borderWidth: 1,
                    backgroundColor: [
                        '#3b82f6',
                        '#22c55e'
                    ],
                    hoverOffset: 4 
                }]
            },
            options: {
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                },
                backgroundColor: 'none',
                cutout: '80%'
            }
        });
    }

    onMount(() => {
        drawSurveyChart();
    });
</script>

<div>
    <canvas id="surveyChart" width="150"></canvas>
</div>
