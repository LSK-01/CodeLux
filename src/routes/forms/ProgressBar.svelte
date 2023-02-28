<!-- https://svelte.dev/repl/7b05d57dcdc04f49be72844e4b2825b3?version=3.44.0 -->
<script lang="ts">
	export let steps : any[] = [];
    export let currentActive : number = 1;
	let circles: NodeListOf<HTMLDivElement>;
    let progress: HTMLDivElement;
	
	export const handleProgress = (stepIncrement : number) => {
		circles = document.querySelectorAll('.circle');
		if(stepIncrement == 1){
			currentActive++

			if(currentActive > circles.length) {
					currentActive = circles.length
			}
		} else {
			currentActive--

			if(currentActive < 1) {
					currentActive = 1 
			}
		}
		

        update()
	}
	
	function update() {
    circles.forEach((circle, idx) => {
        if(idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active');

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';
	}
	
</script>

<div class="progress-container">
	<div class="progress" bind:this={progress}></div>
	{#each steps as step, i}
        <div class="circle {i == 0 ? 'active' : ''}" >{i+1}</div>
	{/each}
</div>


<style>
	.progress-container {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin-bottom: 30px;
		width: 100%;
	}

	.progress-container::before {
		content: '';
		background-color: #e0e0e0;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 100%;
		z-index: -1;
	}

	.progress {
		background-color: #f87171;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 0%;
		z-index: -1;
		transition: 0.4s ease;
	}

	.circle {
		background-color: #fff;
		color: #2d3436;
		border-radius: 50%;
		height: 30px;
		width: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid #e0e0e0;
		transition: 0.4s ease;
		cursor: pointer;
	}
	
	.circle::after{
		content: attr(data-title) " ";
		position: absolute;
		bottom: 35px;
		color: #999;
		transition: 0.4s ease;
	}
	
	.circle.active::after {
		color: #f87171;
	}

	.circle.active {
		border-color: #f87171;
	}
</style>