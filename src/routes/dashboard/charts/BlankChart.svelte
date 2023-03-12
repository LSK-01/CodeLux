<script lang='ts'>
    import Chart from 'chart.js/auto'
    import { onMount } from 'svelte';

    // Function to draw chart
    function drawBlankChart() {
        // Get chart element
        const chartElement = document.getElementById('blankChart')!;

        // Initialise new chart
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: [""],
                datasets: [{
                    data: [1],
                    borderWidth: 0,
                    backgroundColor: ['#ddd'],
                    hoverOffset: 0
                }]
            },
            options: {
                radius: '96%',
                events: [],
                animations:{
                    animateRotate: false,
                },
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

    // Draw chart when component is mounted
    onMount(() => {
        drawBlankChart();
    });
</script>

<div>
    <canvas id="blankChart" width="150"></canvas>
</div>
