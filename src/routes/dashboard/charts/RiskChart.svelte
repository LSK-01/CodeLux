<script lang='ts'>
	import type { PageData } from "../$types";
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';
	export let data: PageData;

    // Draw risk chart
    function drawRiskChart() {
        // Get chart element
        const chartElement = document.getElementById('riskChart')!;

        // Initialise new chart
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: ["Not at risk", "At risk"],
                datasets: [{
                    data: [data.notAtRisk, data.atRisk],
                    borderWidth: 1,
                    backgroundColor: [
                        '#22c55e',
                        '#ef4444'
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

    // Draw risk chart on mount 
    onMount(() => {
        drawRiskChart();
    });
</script>

<div>
    <canvas id="riskChart" width="150"></canvas>
</div>