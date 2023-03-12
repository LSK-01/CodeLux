<script lang='ts'>
	import type { PageData } from "../$types";
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';
	export let data: PageData;

    // Draw survey chart
    function drawSurveyChart() {
        // Get survey chart element
        const chartElement = document.getElementById('surveyChart')!;

        // Initialise chart
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: ["Without surveys", "With surveys"],
                datasets: [{
                    data: [data.withoutSurveys, data.withSurveys],
                    borderWidth: 1,
                    backgroundColor: [
                        '#22c55e',
                        '#3b82f6'
                    ],
                    hoverOffset: 4 
                }]
            },
            options: {
                radius: '96%',
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

    // Draw chart on mount
    onMount(() => {
        drawSurveyChart();
    });
</script>

<div>
    <canvas id="surveyChart" width="160"></canvas>
</div>
