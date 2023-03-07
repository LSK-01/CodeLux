<script lang='ts'>
	import type { PageData } from "./$types";
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';
	export let data: PageData;

    function drawTaskChart() {
        const chartElement = document.getElementById('taskChart')!;
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: ["With tasks", "Without tasks"],
                datasets: [{
                    data: [data.withTasks, data.withoutTasks],
                    borderWidth: 1,
                    backgroundColor: [
                        '#fde047',
                        '#22c55e'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            display:false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display:false
                        }   
                    }]
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
        drawTaskChart();
    });
</script>

<div>
    <canvas id="taskChart" width="150"></canvas>
</div>