<script lang='ts'>
	import type { PageData } from "../$types";
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';
	export let data: PageData;

    // Function to draw task chart
    function drawTaskChart() {
        // Get task chart element
        const chartElement = document.getElementById('taskChart')!;

        // Initialise task chart
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: ["Without tasks", "With tasks"],
                datasets: [{
                    data: [data.withoutTasks, data.withTasks],
                    borderWidth: 1,
                    backgroundColor: [
                        '#22c55e',
                        '#fde047'
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

    // Draw task chart on mount
    onMount(() => {
        drawTaskChart();
    });
</script>

<div>
    <canvas id="taskChart" width="150"></canvas>
</div>