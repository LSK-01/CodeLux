<script lang='ts'>
	import type { PageData } from "./$types";
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';
	export let data: PageData;

    function drawRiskChart() {
        const chartElement = document.getElementById('riskChart')!;
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: ["At risk", "Not at risk"],
                datasets: [{
                    data: [data.atRisk, data.notAtRisk],
                    borderWidth: 1,
                    backgroundColor: [
                        '#ef4444',
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
        drawRiskChart();
    });
</script>

<div>
    <canvas id="riskChart" width="150"></canvas>
</div>
